"use client";

import { createBrowserClient } from "@supabase/ssr";
import { type Session } from "@supabase/supabase-js";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createBrowserClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      flowType: "pkce",
    },
  }
);

type SupabaseAuthContextValue = {
  supabase: typeof supabase;
  session: Session | null | undefined;
  isLoading: boolean;
};

const SupabaseAuthContext = createContext<SupabaseAuthContextValue | undefined>(undefined);

export default function SupabaseProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      // Get session from browser cookies (persisted by middleware)
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(data.session);
      setIsLoading(false);
    }

    loadSession();

    // Subscribe to auth state changes (login/logout events)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setSession(session);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({ supabase, session, isLoading }),
    [session, isLoading]
  );

  return <SupabaseAuthContext.Provider value={value}>{children}</SupabaseAuthContext.Provider>;
}

function useSupabaseContext() {
  const context = useContext(SupabaseAuthContext);
  if (!context) {
    throw new Error("useSupabaseClient must be used within SupabaseProvider");
  }
  return context;
}

export function useSupabaseClient() {
  return useSupabaseContext().supabase;
}

export function useSession() {
  return useSupabaseContext().session;
}

export function useSessionLoading() {
  return useSupabaseContext().isLoading;
}
