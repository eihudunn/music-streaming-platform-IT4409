'use client';

import usecreateAlbumModal from '@/hooks/usecreateAlbumModal';
import Modal from './Modal';
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { useState } from 'react';
import Input from './Input';
import Button from './Button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import createSong from '@/actions/song/createSong';
import { useSession } from 'next-auth/react';
import useCreateAlbumModal from '@/hooks/useCreateAlbumModal';
import { BiPlusCircle } from 'react-icons/bi';
import { RiCloseCircleFill, RiCloseCircleLine } from 'react-icons/ri';
import createAlbum from '@/actions/album/createAlbum';

const CreateAlbumModal = () => {
  const createAlbumModal = useCreateAlbumModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const { register, handleSubmit, reset, control } = useForm<FieldValues>({
    defaultValues: {
      artist: '',
      title: '',
      song: null,
      img: null,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'songs',
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      createAlbumModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.songs?.[0];
      values.imgFile = imageFile;
      values.artist = session?.user?._doc.username;
      values.userId = session?.user?._doc._id;
      console.log(values);

      if (!imageFile || !songFile) {
        toast.error('Missing required file!');
        return;
      }

      const promises = values.songs.map((song: any) => {
        const songFile = song.song?.[0];
        const payload = {
          songFile,
          imgFile: imageFile,
          title: song.title,
          artist: values.artist,
          userId: values.userId,
        };
        return createSong(payload);
      });

      const results = await Promise.all(promises);

      if (!results) {
        toast.error('Failed to upload song');
        return;
      }

      const songIds = results.map((res) => res?._id);
      console.log(songIds);

      // Create album with songIds
      const albumPayload = {
        title: values.title,
        imgFile: values.imgFile,
        artist: values.artist,
        artistId: values.userId,
        tracks: songIds,
      };
      const albumResult = await createAlbum(albumPayload);

      if (!albumResult) {
        toast.error('Failed to create album');
        return;
      }

      router.refresh();
      toast.success('Song created!');
      reset();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
      createAlbumModal.onClose();
    }
  };

  return (
    <Modal
      title="Add an album"
      description="Upload mp3 files"
      isOpen={createAlbumModal.isCreateAlbumOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder="Album title"
        />
        <div>
          <div className="pb-1">Select album image</div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            {...register('image', { required: true })}
            accept="image/*"
          />
        </div>
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="pb-1">Select a song file</div>
            <div className="flex flex-row items-center justify-start gap-x-2 text-neutral-300 hover:text-neutral-200 transition">
              <Input
                id={`song-${index}`}
                type="file"
                disabled={isLoading}
                {...register(`songs.${index}.song`, { required: true })}
                accept=".mp3"
              />
              <Input
                id={`song-title-${index}`}
                type="text"
                disabled={isLoading}
                {...register(`songs.${index}.title`, { required: true })}
                placeholder="Song title"
              />
              <button type="button" onClick={() => remove(index)}>
                <RiCloseCircleLine />
              </button>
            </div>
          </div>
        ))}
        <button
          className="flex flex-row items-center justify-start gap-x-2 text-neutral-300 hover:text-neutral-200 transition"
          type="button"
          onClick={() => append({ song: '' })}
        >
          <BiPlusCircle /> Add more song
        </button>
        <Button disabled={isLoading} type="submit">
          Upload album
        </Button>
      </form>
    </Modal>
  );
};

export default CreateAlbumModal;
