"use client";
import useNotificationDropdown from "@/hooks/useNotificationDropdown";
import { RiNotification4Line } from "react-icons/ri";

export function NotificationNavbar() {
  const notificationDropdown = useNotificationDropdown();

  const toggleNotificationDropdown = () => {
    if (notificationDropdown.isOpen) {
      notificationDropdown.onClose();
    } else {
      if (!notificationDropdown.closedByOutsideClick) {
        notificationDropdown.onOpen();
      }
      notificationDropdown.setClosedByOutsideClick(false);
    }
  };

  return (
    <div
      className={`w-6 h-6 flex justify-center items-center cursor-pointer rounded-full 
			 transition-colors hover:border-neutral-600 hover:text-neutral-700 peer
    	bg-none border border-border 
    	${notificationDropdown.isOpen ? 'border-neutral-600 dark:border-neutral-500' : 'border-neutral-500 dark:border-neutral-700'}`}
      onClick={toggleNotificationDropdown}
    >
      <RiNotification4Line
        className={`peer-hover:text-neutral-700 dark:peer-hover:text-neutral-300
					${notificationDropdown.isOpen ? 'text-neutral-800 dark:text-neutral-300' : 'text-neutral-600 dark:text-neutral-400'}`}
        size={14}
      />
    </div>
  );
}
