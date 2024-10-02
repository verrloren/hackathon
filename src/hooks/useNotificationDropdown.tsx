import { create } from 'zustand';

interface NotificationDropdownStore {
  isOpen: boolean;
  closedByOutsideClick: boolean;
  onOpen: () => void;
  onClose: () => void;
  setClosedByOutsideClick: (value: boolean) => void;
}

const useNotificationDropdown = create<NotificationDropdownStore>((set) => ({
  isOpen: false,
  closedByOutsideClick: false,
  onOpen: () => set({ isOpen: true, closedByOutsideClick: false }),
  onClose: () => set({ isOpen: false }),
  setClosedByOutsideClick: (value: boolean) => set({ closedByOutsideClick: value }),
}));

export default useNotificationDropdown;