import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
const inter = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Webmaker",
  description: "All things you need in one agency",
};
import { ThemeProvider } from "./providers/theme_providers";
import ModalProvider from "./providers/modal_provider";
import { Toast } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body  className={inter.className}>

      <ThemeProvider
           attribute="class"
           defaultTheme="system"
           enableSystem
           disableTransitionOnChange
      >

        
        <ModalProvider>
          {children}
          <Toaster/>
        </ModalProvider>
        
        </ThemeProvider>
        </body>

      
    </html>
  );
}
