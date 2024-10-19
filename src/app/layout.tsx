import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import ToasterProvider from "@/providers/toaster-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "../../auth";
import ModalProvider from "@/providers/modal-provider";
// import localFont from "next/font/local";


// const waveHaus = localFont({
// 	src: [
// 		{
// 			path: "../public/fonts/Wavehaus-Light.otf",
// 			weight: "300",
// 			style: "normal",
// 		},
// 		{
// 			path: "../public/fonts/Wavehaus-Book.otf",
// 			weight: "400",
// 			style: "normal",
// 		},
// 		{
// 			path: "../public/fonts/Wavehaus-SemiBold.otf",
// 			weight: "600",
// 			style: "normal",
// 		},
// 		{
// 			path: "../public/fonts/Wavehaus-Bold.otf",
// 			weight: "700",
// 			style: "normal",
// 		},
// 	],
// });

const poppins = Poppins({
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
	

	const session = await auth();

  return (
    <html lang="en">
      <body className={poppins.className}>
				<ModalProvider />
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
