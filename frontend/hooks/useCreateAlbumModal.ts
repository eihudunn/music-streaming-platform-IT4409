import { create } from 'zustand';

interface CreateAlbumModalStore {
  isCreateAlbumOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCreateAlbumModal = create<CreateAlbumModalStore>((set) => ({
  isCreateAlbumOpen: false,
  onOpen: () => set({ isCreateAlbumOpen: true }),
  onClose: () => set({ isCreateAlbumOpen: false }),
}));

export default useCreateAlbumModal;
