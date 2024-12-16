
"use client";
// import { useSession } from "next-auth/react";
// import useNotificationDropdown from "@/hooks/useNotificationDropdown";
// import NotificationDropdown from "@/components/header/notification-dropdown";
// import { NotificationNavbar } from "./notification-navbar";
// import { ProfileImageNavbar } from "./profile-image-navbar";
// import { NotificationProps } from "@/lib/types";
import useMenuDropdown from "@/hooks/useMenuDropdown";
import { Logo } from "./logo";
import { MenuNavbar } from "./menu-navbar";
import { MenuDropdown } from "./menu-dropdown";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { LogOut, Moon, Sun } from "lucide-react";
import { IoIosLogIn } from "react-icons/io";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import {  useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GoGraph } from "react-icons/go";



export default function Header() {
  // const { data: session } = useSession();
  // const notificationDropdown = useNotificationDropdown();
  const { setTheme, theme } = useTheme();
  const menuDropdown = useMenuDropdown();
	const { data: session } = useSession();
	const router = useRouter();
	

  return (
    <header className="w-full h-36 bg-background px-16 md:px-20 lg:px-28 xl:px-32 2xl:px-36 flex items-center justify-between">
      <Logo />
      <div className="flex flex-row gap-x-3 items-center md:hidden">
        {/* <NotificationNavbar notifications={notifications} /> */}
        {/* {session && <ProfileImageNavbar />} */}
        <MenuNavbar />
      </div>
      <div className="flex-row gap-x-2 items-center hidden md:flex">
        <Button
        	 onClick={() => router.push("/overview")}
          className="w-full bg-transparent text-textGrayDark dark:text-textGray  
							dark:hover:text-white hover:text-neutral-950 transition-colors hover:bg-transparent 
							shadow-none gap-x-2 justify-start text-base"
        >
          <GoGraph size="14" className="text-neutral-800 dark:text-neutral-400" />
        </Button>
        <Button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="w-full bg-transparent text-textGrayDark dark:text-textGray  
							dark:hover:text-white hover:text-neutral-950 transition-colors hover:bg-transparent 
							shadow-none gap-x-2 justify-start  text-base"
        >
          {theme === "light" ? (
            <Moon
              size="14"
              className="text-neutral-800 dark:text-neutral-400"
            />
          ) : (
            <Sun className="text-neutral-800 dark:text-neutral-400" size="14" />
          )}
        </Button>

						{session ? (
                <Button
                  className="w-full bg-transparent text-textGrayDark dark:text-textGray  
								dark:hover:text-white hover:text-neutral-900 transition-colors hover:bg-transparent 
								shadow-none gap-x-2 justify-start text-base"
                  onClick={() => {
                    signOut().then(() => toast.success("Logged out"));
                    menuDropdown.onClose();
                  }}
                >
                  <LogOut className="text-neutral-800 dark:text-neutral-400" size="14" />
									Logout
                </Button>
              ) : (
                <Button
                  className="w-full bg-transparent text-textGrayDark dark:text-textGray  
							dark:hover:text-white hover:text-neutral-900 transition-colors hover:bg-transparent 
							shadow-none gap-x-2 justify-start ml-3 text-base"
                  onClick={() => router.push("/auth/login")}
                >
                  <IoIosLogIn className="text-neutral-400" size="14" />
									Login
                </Button>
              )}
      </div>
      {menuDropdown.isOpen && <MenuDropdown />}
      {/* {notificationDropdown.isOpen && <NotificationDropdown notifications={notifications} />}  */}
    </header>
  );
}
