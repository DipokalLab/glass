import { create } from "zustand";

interface ResolutionStore {
  width: number;
  height: number;
  setResolution: (width: number, height: number) => void;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
}

export const useResolutionStore = create<ResolutionStore>((set) => ({
  width: 512,
  height: 512,
  setResolution: (newWidth, newHeight) =>
    set({ width: newWidth, height: newHeight }),
  setWidth: (newWidth) => set({ width: newWidth }),
  setHeight: (newHeight) => set({ height: newHeight }),
}));
