"use client";
import { Logo } from "./logo";
import { MenuNavbar } from "./menu-navbar";
import { NotificationNavbar } from "./notification-navbar";
import { ProfileImageNavbar } from "./profile-image-navbar";
import { MenuDropdown } from "@/components/header/menu-dropdown";
import { Search } from "./search";

import useMenuDropdown from "@/hooks/useMenuDropdown";
import useNotificationDropdown from "@/hooks/useNotificationDropdown";
import { NotificationDropdown } from "./notification-dropdown";

export default function Header() {
	
  const menuDropdown = useMenuDropdown();
	const notificationDropdown = useNotificationDropdown();

  return (
    <div className="relative w-[95%] h-12 mt-4 mx-auto">
      <header className="w-full relative h-full z-10 bg-white/40 dark:bg-[#070707]/95 backdrop-blur-lg border border-border rounded-full">
        <div className="w-full h-full px-6 flex items-center justify-between">
          <Logo />
          <Search />
          <div className="flex flex-row gap-x-3 items-center">
            <NotificationNavbar />
            <ProfileImageNavbar />
            <MenuNavbar />
          </div>
        </div>
      </header>
      {menuDropdown.isOpen && <MenuDropdown />}
			{notificationDropdown.isOpen && <NotificationDropdown />}
    </div>
  );
}