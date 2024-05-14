"use client"

import uniqid from "uniqid";
import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const UploadModal = () => {
    const uploadModal = useUploadModal();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null,
        }
    })

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            uploadModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = (values) => {
        try {
            setIsLoading(true);
            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if (!imageFile || !songFile) {
                toast.error("Missing required file!");
                return;
            }

            const uniqueID = uniqid();
            //Upload here

            router.refresh();
            setIsLoading(false);
            toast.success("Song created!")
            reset();
            uploadModal.onClose();
        }
        catch (error) {
            toast.error("Something went wrong")
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal title="Add a song"
        description="Upload an mp3 file"
        isOpen = {uploadModal.isOpen}
        onChange={onChange}
        >
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="flex flex-col gap-y-4"
            >
                <Input
                    id="title" 
                    disabled={isLoading} 
                    {...register('title', {required: true})} 
                    placeholder="Song title"  
                />
                <Input
                    id="author" 
                    disabled={isLoading} 
                    {...register('author', {required: true})} 
                    placeholder="Song author"  
                />
                <div>
                    <div className="pb-1">
                        Select a song file
                    </div>
                    <Input
                        id="song" 
                        type="file"
                        disabled={isLoading} 
                        {...register('song', {required: true})} 
                        accept=".mp3"
                    />
                </div>
                <div>
                    <div className="pb-1">
                        Select an image
                    </div>
                    <Input
                        id="image" 
                        type="file"
                        disabled={isLoading} 
                        {...register('image', {required: true})} 
                        accept="image/*"
                    />
                </div>
                <Button disabled={isLoading} type="submit">
                    Upload song
                </Button> 
            </form>
        </Modal>
    )
}

export default UploadModal;