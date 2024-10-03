import { create } from "zustand";

interface PrewiewModalStore {
	isOpen: boolean;
	data?: any;
	onOpen: (data) => void;
	onClose: () => void;
}

const usePreviewModal = create<PrewiewModalStore>((set) => ({
	isOpen: false,
	data:	undefined,
	onOpen: (data) => set({ data, isOpen: true }),
	onClose: () => set({ isOpen: false }),
}))

export default usePreviewModal;