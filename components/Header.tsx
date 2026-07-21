"use client";

import Link from "next/link";
import { useSession } from "@/components/SupabaseProvider";
import SignOutButton from "./SignOutButton";

export default function Header() {
  const session = useSession();

  return (
    <header className="border-b border-zinc-200 bg-white">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <Link href="/" className="text-lg font-bold tracking-tight">
            Submission Platform
          </Link>
        </div>

        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/films" className="text-zinc-600 hover:text-zinc-950">
            Films
          </Link>
          <Link href="/submissions" className="text-zinc-600 hover:text-zinc-950">
            Submissions
          </Link>
          <Link
            href="/films/new"
            className="rounded bg-zinc-900 px-3 py-2 text-white hover:bg-zinc-700"
          >
            New film
          </Link>
          {session ? (
            <SignOutButton />
          ) : (
            <Link
              href="/login"
              className="rounded border border-zinc-300 px-3 py-2 text-zinc-700 hover:border-zinc-900 hover:text-zinc-900"
            >
              Sign in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
