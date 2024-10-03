"use client";
import { Logo } from "./logo";
import { MenuNavbar } from "./menu-navbar";
import { NotificationNavbar } from "./notification-navbar";
import { ProfileImageNavbar } from "./profile-image-navbar";
import { MenuDropdown } from "@/components/header/menu-dropdown";

import useMenuDropdown from "@/hooks/useMenuDropdown";
import useNotificationDropdown from "@/hooks/useNotificationDropdown";
import { NotificationDropdown } from "./notification-dropdown";
import { useSession } from "next-auth/react";

function Header() {
	
  const menuDropdown = useMenuDropdown();
	const notificationDropdown = useNotificationDropdown();
  const { data: session } = useSession();
	// const router = useRouter();

  // // Redirect to login page if not authenticated
  // if (status === "unauthenticated") {
  //   router.push("/auth/login");
  //   return null; // Prevent rendering the component
  // }


  return (
    <div className="relative mt-6 z-50 mx-auto w-[95%] h-16 ">
      <header className="w-full z-50 relative h-full bg-white/40 dark:bg-[#070707]/95 backdrop-blur-lg border border-border rounded-full">
        <div className="w-full h-full px-6 flex items-center justify-between">
          <Logo />
          {/* <Search /> */}
          <div className="flex flex-row gap-x-3 items-center">
            <NotificationNavbar />
						{session && <ProfileImageNavbar />}
            <MenuNavbar />
          </div>
        </div>
      </header>
      {menuDropdown.isOpen && <MenuDropdown />}
			{notificationDropdown.isOpen && <NotificationDropdown />}
    </div>
  );
}
export default Header