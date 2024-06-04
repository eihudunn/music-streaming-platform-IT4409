'use client';

import uniqid from 'uniqid';
import useUploadModal from '@/hooks/useUploadModal';
import Modal from './Modal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import Input from './Input';
import Button from './Button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import createSong from '@/actions/song/createSong';
import { useSession } from 'next-auth/react';
import { Genre, GenreArr } from '@/const/genre';

const UploadModal = () => {
  const uploadModal = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      artist: '',
      title: '',
      song: null,
      img: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];
      values.imgFile = imageFile;
      values.songFile = songFile;

      values.artist = session?.user?._doc.username;
      values.userId = session?.user?._doc._id;
      console.log(values);

      if (!imageFile || !songFile) {
        toast.error('Missing required file!');
        return;
      }

      const res = await createSong(values);
      if (!res) {
        toast.error('Failed to create song');
        return;
      }
      router.refresh();
      toast.success('Song created!');
      reset();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
      uploadModal.onClose();
    }
  };

  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder="Song title"
        />
        {/* <Input
          id="artist"
          disabled={isLoading}
          {...register('artist', { required: true })}
          placeholder="Song artist"
        /> */}
        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            {...register('song', { required: true })}
            accept=".mp3"
          />
        </div>
        <div>
          <div className="pb-1">Select an image</div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            {...register('image', { required: true })}
            accept="image/*"
          />
        </div>
        <div>
          <div className="pb-1">Select a genre</div>
          <select id="genre" {...register('genre', { required: true })}>
            {GenreArr.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
            {/* Add more genres as needed */}
          </select>
        </div>
        <Button disabled={isLoading} type="submit">
          Upload song
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
