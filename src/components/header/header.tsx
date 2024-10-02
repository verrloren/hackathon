"use client";
import { Logo } from "./logo";
import { MenuNavbar } from "./menu-navbar";
import { NotificationNavbar } from "./notification-navbar";
import { ProfileImageNavbar } from "./profile-image-navbar";
import useMenuDropdown from "@/modal/useMenuDropdown";
import { MenuDropdown } from "@/components/header/menu-dropdown";


import { Search } from "./search";

export default function Header() {

  const menuDropdown = useMenuDropdown();


  return (
    <div className="relative w-[95%] h-10 mt-4 mx-auto">
      <header className="w-full relative h-10 z-10 bg-[#050505]/95 backdrop-blur-lg border border-border rounded-full">
        <div className="w-full h-full px-4 flex items-center justify-between">
          <Logo />
          <Search />
          <div className="flex flex-row gap-x-2 items-center">
            <NotificationNavbar />
            <ProfileImageNavbar />
            <MenuNavbar />
          </div>
        </div>
      </header>
			{menuDropdown.isOpen && <MenuDropdown />}
    </div>
  );
}
