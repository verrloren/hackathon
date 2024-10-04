import type { Metadata } from "next";
import "./globals.css";
// import { Actor } from 'next/font/google'
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import ToasterProvider from "@/providers/toaster-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "./auth";
import ModalProvider from "@/providers/modal-provider";
import getHotels from "@/hooks/getHotels";
// import { DM_Sans } from 'next/font/google'
// import { Outfit } from 'next/font/google'
// import { Space_Grotesk } from 'next/font/google'

const actor = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"], // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Complexity",
  description: "Dinamic pricing",
};

// interface HotelData {
// 	hotel_id: string;
// 	room_name: string;
// 	price: number;
// 	meal: string;
// 	yandex_name: string;
// 	yandex_price: number;
// 	price_diff: number;
// 	percentage_price_diff: number;
// 	checkin: string | number | null;
// 	checkout: string | number | null;
// }

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	

	const hotel = await getHotels({
		hotel_name: '',
		hotel_id: '',
		room_name: '',
		price: 0,
		meal: '',
		yandex_name: '',
		yandex_price: 0,
		price_diff: 0,
		percentage_price_diff: 0,
		checkin: 0,
		checkout: 0,
		})

  const session = await auth();
	
  return (
    <html lang="en">
      <body className={actor.className}>
				<ModalProvider hotel={hotel} />
        <ToasterProvider />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
						{children}
					</SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
