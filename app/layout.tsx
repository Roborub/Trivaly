import type { Metadata } from "next";
import { ModeToggle } from "@/components/theme/ModeToggle";
import "./globals.min.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { HomeButton } from "@/components/home/HomeButton";
import GameProviderWrapper from "@/components/client-wrappers/GameProviderClientWrapper";

export const metadata: Metadata = {
  title: "Trivaly",
  description: "A trivia game for the curious mind.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
          <body className={`font-heavitas antialiased overflow-y-hidden`}>
            <GameProviderWrapper>
              <ThemeProvider attribute="class" defaultTheme="system">
                <section className="flex z-20 relative items-center py-10 xl:w-1/3 flex-col text-center mx-auto">
                <ModeToggle className="absolute top-5 left-5" buttonClassName="bg-lighter hover:text-darker dark:bg-darker dark:text-lighter cursor-pointer" />
                  {children}
                <HomeButton className="absolute top-5 left-15" />
                </section>
              </ThemeProvider>
            </GameProviderWrapper>
          </body>
    </html>
  );
}
