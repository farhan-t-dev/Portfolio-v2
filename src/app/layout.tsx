import type { Metadata } from "next";
import { Oswald, Rajdhani, JetBrains_Mono } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CommandPalette from "@/components/command-palette";
import { ThemeProvider } from "@/components/theme-provider";

const oswald = Oswald({ 
  subsets: ["latin"],
  variable: "--font-oswald",
});

const rajdhani = Rajdhani({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Farhan | Full Stack System",
  description: "Advanced web solutions and system architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${oswald.variable} ${rajdhani.variable} ${jetbrainsMono.variable} antialiased min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* Subtle Aurora Background */}
          <div className="fixed inset-0 z-[-1] bg-background bg-aurora transition-colors duration-500"></div>
          
          <Navbar />
          <CommandPalette />
          <main className="flex flex-col min-h-screen relative">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}