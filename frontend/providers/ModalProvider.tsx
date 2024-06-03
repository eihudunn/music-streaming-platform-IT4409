'use client';

import CreateAlbumModal from '@/components/CreateAlbumModal';
import UploadModal from '@/components/UploadModal';
// import AuthModal from "@/components/AuthModal";
import { useEffect, useState } from 'react';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <UploadModal />
      <CreateAlbumModal />
    </>
  );
};

export default ModalProvider;
