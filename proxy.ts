import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  // Never trust a user ID supplied by the browser.
  // The proxy will replace it with the verified Supabase user ID.
  requestHeaders.delete("x-user-id");

  let response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },

        set(name: string, value: string, options: any) {
          response.cookies.set(name, value, options);
        },

        remove(name: string, options: any) {
          response.cookies.delete(name);
        },
      },
    }
  );

  // Verify the user with Supabase.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Forward the verified user ID to Server Components.
  if (user) {
    requestHeaders.set("x-user-id", user.id);
  }

  // Re-create the response using the updated request headers.
  const finalResponse = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Preserve any cookies Supabase refreshed.
  response.cookies.getAll().forEach((cookie) => {
    finalResponse.cookies.set(cookie);
  });

  return finalResponse;
}

export const config = {
  matcher: [
    "/films/:path*",
    "/submissions/:path*",
  ],
};