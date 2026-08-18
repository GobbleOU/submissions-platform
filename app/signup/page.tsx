"use client";
///pull from main 
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useSupabaseClient,
  useSession,
  useSessionLoading,
} from "@/components/SupabaseProvider";

export default function SignupPage() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const isLoading = useSessionLoading();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // If the user is already logged in, go straight to films
  useEffect(() => {
    if (!isLoading && session) {
      router.replace("/films");
    }
  }, [session, isLoading, router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;

    setStatus(null);

    // Check that passwords match
    if (password !== confirmPassword) {
      setStatus("Passwords do not match.");
      return;
    }

    // Basic password length check
    if (password.length < 6) {
      setStatus("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setStatus(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  if (session) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Redirecting...</p>
      </main>
    );
  }

  if (success) {
    return (
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16">
        <div className="rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
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

            <h1 className="text-3xl font-bold tracking-tight">
              Check your email
            </h1>

            <p className="mt-3 text-sm text-zinc-600">
              We've sent a confirmation link to{" "}
              <strong>{email}</strong>.
            </p>

            <p className="mt-4 text-sm text-zinc-600">
              Click the link in the email to confirm your account.
              After that, you can log in using your email and password.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push("/login")}
            className="mt-8 w-full rounded-xl bg-zinc-950 px-4 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            Go to login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16">
      <div className="rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight">
          Create your account
        </h1>

        <p className="mt-3 text-sm text-zinc-600">
          Create an account to manage your film submissions.
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

          <label className="block text-sm font-medium text-zinc-700">
            Password

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              disabled={loading}
              className="mt-2 w-full rounded-lg border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 disabled:bg-zinc-50 disabled:text-zinc-500"
              placeholder="At least 6 characters"
            />
          </label>

          <label className="block text-sm font-medium text-zinc-700">
            Confirm password

            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              disabled={loading}
              className="mt-2 w-full rounded-lg border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 disabled:bg-zinc-50 disabled:text-zinc-500"
              placeholder="Enter your password again"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-zinc-950 px-4 py-3 text-sm font-semibold text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        {status ? (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
            {status}
          </div>
        ) : null}

        <div className="mt-6 text-center text-sm text-zinc-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="font-medium text-zinc-900 hover:underline"
          >
            Sign in
          </button>
        </div>

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
