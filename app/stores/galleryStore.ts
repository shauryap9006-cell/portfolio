import { create } from 'zustand';

interface GalleryStore {
  selectedCert: any | null;
  setSelectedCert: (cert: any | null) => void;
}

export const useGalleryStore = create<GalleryStore>((set) => ({
  selectedCert: null,
  setSelectedCert: (cert) => set({ selectedCert: cert }),
}));
