"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabaseClient, useSession } from "@/components/SupabaseProvider";

export default function LoginPage() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "check">("email");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (session) {
      router.push("/films");
    }
  }, [session, router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const { error } = await supabase.auth.signInWithOtp({ 
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setStatus(`Failed to send login link: ${error.message}`);
      setLoading(false);
    } else {
      setStep("check");
      setStatus(null);
      // Don't reset loading - keep it true to show we're waiting
    }
  }

  if (step === "check") {
    return (
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16">
        <div className="rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Check your email</h1>
            <p className="mt-3 text-sm text-zinc-600">
              We've sent a secure login link to <strong>{email}</strong>
            </p>
          </div>

          <div className="mt-8 rounded-xl bg-blue-50 border border-blue-200 p-4">
            <p className="text-sm text-blue-900">
              <strong>What happens next?</strong>
              <br />
              Click the link in the email to securely sign in. This link will keep you logged in across
              all your devices.
            </p>
          </div>

          <button
            onClick={() => {
              setStep("email");
              setEmail("");
            }}
            className="mt-6 text-sm font-medium text-zinc-600 hover:text-zinc-900"
          >
            ← Back to login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16">
      <div className="rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight">Sign in to your account</h1>
        <p className="mt-3 text-sm text-zinc-600">
          Enter your email to receive a secure login link. You'll stay signed in across your devices.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <label className="block text-sm font-medium text-zinc-700">
            Email address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              disabled={loading}
              className="mt-2 w-full rounded-lg border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 disabled:bg-zinc-50 disabled:text-zinc-500"
              placeholder="you@example.com"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-zinc-950 px-4 py-3 text-sm font-semibold text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Sending secure link..." : "Send login link"}
          </button>
        </form>

        {status ? (
          <div className="mt-6 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-900">
            {status}
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => router.push("/")}
          className="mt-6 text-sm font-medium text-zinc-600 hover:text-zinc-900"
        >
          Back to home
        </button>
      </div>
    </main>
  );
}
