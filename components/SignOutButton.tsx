"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@/components/SupabaseProvider";

export default function SignOutButton() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={loading}
      className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Signing out..." : "Sign out"}
    </button>
  );
}
