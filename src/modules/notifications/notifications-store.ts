import { Notification } from '@/lib/types';
import {create} from 'zustand';



interface NotificationsStore {
	notifications: Notification[];
	addNotification: (notification: Notification) => void;
	removeNotification: (id: string) => void;
}

export const useNotificationsStore = create<NotificationsStore>((set) => ({
	notifications: [],
	addNotification: (notification) =>
		set((state) => ({
			notifications: [...state.notifications, notification],
		})),
	removeNotification: (id) =>
		set((state) => ({
			notifications: state.notifications.filter((notification) => notification.id !== id),
		})),
}));


