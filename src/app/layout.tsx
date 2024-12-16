import type { Metadata } from "next";
import "./globals.css";
import { Outfit, Raleway, Manrope } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import ToasterProvider from "@/providers/toaster-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "../../auth";
import ModalProvider from "@/providers/modal-provider";
import Providers from "@/components/providers";

const outfit = Outfit({
  weight: ["300", "400", "500", "600", "700", "800", "900"], // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
});
const raleway = Raleway({
  weight: ["300", "400", "500", "600", "700", "800", "900"], // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
});
const manrope = Manrope({
  weight: ["300", "400", "500", "600", "700", "800"], // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Complexity",
  description: "Dinamic pricing",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning className={`${outfit} ${raleway} ${manrope}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            <Providers>
              <ModalProvider />
              <ToasterProvider />
              {children}
            </Providers>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
