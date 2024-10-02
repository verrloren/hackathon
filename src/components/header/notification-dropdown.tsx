"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
// import { dropdownVariants, itemVariants } from "@/lib/motion-variants";
import useNotificationDropdown from "@/hooks/useNotificationDropdown";
import { NotificationEmpty } from "./notification-empty";
import { Notification } from "./notification";

export function NotificationDropdown() {

	const notification = true;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationDropdown = useNotificationDropdown();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      notificationDropdown.onClose();
      notificationDropdown.setClosedByOutsideClick(true);
    }
  };

  useEffect(() => {
    if (notificationDropdown.isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationDropdown.isOpen]);

	 const dropdownVariants = {
		closed: {
			scaleY: 0,
			opacity: 0,
			transition: {
				duration: 0.2,
				ease: "easeInOut",
			},
		},
		open: {
			scaleY: 1,
			opacity: 1,
			transition: {
				duration: 0.3,
				ease: "easeOut",
				staggerChildren: 0.15,
				delayChildren: 0.2,
			},
		},
	};
	
	 const itemVariants = {
		closed: {
			opacity: 0,
			y: 10,
		},
		open: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.35,
				ease: "easeOut",
			},
		},
	};

  return (
    <AnimatePresence>
      {notificationDropdown.isOpen && (

        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={dropdownVariants}
          ref={dropdownRef}
          className="absolute top-1/2 right-[10%] w-auto h-auto pb-4 pt-10 bg-white/25 dark:bg-[#070707]/90 
					backdrop-blur-lg origin-top rounded-xl border border-border flex justify-center items-center flex-col shadow-sm text-wrap"
        >

          <motion.div
            variants={itemVariants}
            className="w-full bg-transparent text-textGrayDark dark:text-textGray hover:text-neutral-900 dark:hover:text-white cursor-pointer
						transition-colors hover:bg-transparent shadow-none gap-x-2 justify-center flex flex-row items-center mx-3"
          >
            {notification ? <Notification /> : <NotificationEmpty />}
          </motion.div>
        </motion.div>

      )}
    </AnimatePresence>
  );
}
