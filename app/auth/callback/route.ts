import { NextResponse } from "next/server";
import { createRouteSupabase } from "@/lib/supabase-server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createRouteSupabase();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("AUTH CALLBACK ERROR:", error);

      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 400 }
      );
    }
  }

  return NextResponse.redirect(new URL("/films", request.url));
}