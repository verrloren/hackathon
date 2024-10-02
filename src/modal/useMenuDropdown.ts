import { create } from 'zustand'


interface MenuDropdownStore {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

const useMenuDropdown = create<MenuDropdownStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }) ,
}));

export default useMenuDropdown