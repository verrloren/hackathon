// "use client";
// import { Logo } from "./logo";
// import { MenuNavbar } from "./menu-navbar";
// import { NotificationNavbar } from "./notification-navbar";
// import { ProfileImageNavbar } from "./profile-image-navbar";
// import { MenuDropdown } from "@/components/header/menu-dropdown";

// import useMenuDropdown from "@/hooks/useMenuDropdown";
// import useNotificationDropdown from "@/hooks/useNotificationDropdown";
// import { NotificationDropdown } from "./notification-dropdown";
// import { useSession } from "next-auth/react";
// // import { useEffect, useState } from "react";
// // import { createNotification, getPriceDifference } from "@/utils/getUserBy";

// interface HeaderProps {
// 	id: string
// 	message: string
// }

// function Header(notification: HeaderProps) {
	
//   const menuDropdown = useMenuDropdown();
// 	const notificationDropdown = useNotificationDropdown();
//   const { data: session } = useSession();

//   // const [priceDifference, setPriceDifference] = useState<number>(0);

//   // useEffect(() => {
//   //   const fetchPriceDifference = async () => {
//   //     if (session && session.user) {
//   //       const difference = await getPriceDifference(session.user.id as string);
//   //       setPriceDifference(difference);
//   //     }
//   //   };

//   //   fetchPriceDifference();
//   // }, []);

//   // useEffect(() => {
//   //   if (priceDifference > 5) {
//   //     if (session && session.user) {
//   //       createNotification({
//   //         userId: session.user.id as string,
//   //         message: `Price has increased by ${priceDifference}!`
//   //       });
//   //     }
//   //   }
//   // }, [priceDifference, session]);

// 	// const { status } = useSession();

// 	// const router = useRouter();

//   // // Redirect to login page if not authenticated
//   // if (status === "unauthenticated") {
//   //   router.push("/auth/login");
//   //   return null; // Prevent rendering the component
//   // }


//   return (
//     <div className="relative mt-6 z-50 mx-auto w-[95%] h-16 ">
//       <header className="w-full z-50 relative h-full bg-white/40 dark:bg-[#070707]/95 backdrop-blur-lg border border-border rounded-full">
//         <div className="w-full h-full px-6 flex items-center justify-between">
//           <Logo />
//           {/* <Search /> */}
//           <div className="flex flex-row gap-x-3 items-center">
//             <NotificationNavbar />
// 						{session && <ProfileImageNavbar />}
//             <MenuNavbar />
//           </div>
//         </div>
//       </header>
//       {menuDropdown.isOpen && <MenuDropdown />}
// 			{notificationDropdown.isOpen && <NotificationDropdown  notification={notification} />}
//     </div>
//   );
// }
// export default Header

// src/components/header/header.tsx
'use client'
import { useSession } from "next-auth/react";
import useMenuDropdown from "@/hooks/useMenuDropdown";
import useNotificationDropdown from "@/hooks/useNotificationDropdown";
import NotificationDropdown from "@/components/header/notification-dropdown";
import { Logo } from "./logo";
import { NotificationNavbar } from "./notification-navbar";
import { ProfileImageNavbar } from "./profile-image-navbar";
import { MenuNavbar } from "./menu-navbar";
import { MenuDropdown } from "./menu-dropdown";
import { useRouter } from "next/navigation";
import { NotificationProps } from "@/lib/types";

type HeaderProps = {
  notifications: NotificationProps[];
};

export default function Header({ notifications }: HeaderProps) {

	const router = useRouter();
  const { data: session, status } = useSession();
  const menuDropdown = useMenuDropdown();
  const notificationDropdown = useNotificationDropdown();

  if (status === "unauthenticated") {
    router.push("/auth/login");
    return null;
  }

  return (
    <div className="relative w-[95%] h-12 mt-4 mx-auto">
      <header className="w-full relative h-full z-20 bg-white/40 dark:bg-[#070707]/95 backdrop-blur-lg border border-border rounded-full">
        <div className="w-full h-full px-6 flex items-center justify-between">
          <Logo />
          <div className="flex flex-row gap-x-3 items-center">
            <NotificationNavbar />
            {session && <ProfileImageNavbar />}
            <MenuNavbar />
          </div>
        </div>
      </header>
      {menuDropdown.isOpen && <MenuDropdown />}
      {notificationDropdown.isOpen && <NotificationDropdown notifications={notifications} />}
    </div>
  );
}