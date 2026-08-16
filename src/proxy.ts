import { type NextRequest, NextResponse } from "next/server";
import { getAuthRedirectPath } from "@/features/auth/routeAccess";
import { updateSession } from "@/libs/supabase/proxy";

const redirectWithSessionCookies = (request: NextRequest, destination: string, response: NextResponse) => {
  const redirectResponse = NextResponse.redirect(new URL(destination, request.url));

  response.cookies.getAll().forEach((cookie) => redirectResponse.cookies.set(cookie));

  return redirectResponse;
};

export async function proxy(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const redirectPath = getAuthRedirectPath(request.nextUrl.pathname, Boolean(user));

  if (redirectPath) {
    return redirectWithSessionCookies(request, redirectPath, response);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
