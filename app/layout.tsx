import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Submission Platform",
  description: "Organize film profiles and submissions in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-zinc-200 bg-white">
          <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-bold tracking-tight">
              Submission Platform
            </Link>
            <div className="flex items-center gap-4 text-sm font-medium">
              <Link href="/films" className="text-zinc-600 hover:text-zinc-950">
                Films
              </Link>
              <Link href="/submissions" className="text-zinc-600 hover:text-zinc-950">
                Submissions
              </Link>
              <Link href="/films/new" className="rounded bg-zinc-900 px-3 py-2 text-white hover:bg-zinc-700">
                New film
              </Link>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
