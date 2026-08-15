export type RouteAccess = "authenticated" | "unauthenticated" | "public";

const AUTHENTICATED_ONLY_PATHS = [/^\/articles\/new\/?$/, /^\/articles\/[^/]+\/edit\/?$/, /^\/profile(?:\/|$)/];
const UNAUTHENTICATED_ONLY_PATHS = [/^\/login\/?$/, /^\/signup\/?$/];

export const getRouteAccess = (pathname: string): RouteAccess => {
  if (AUTHENTICATED_ONLY_PATHS.some((pattern) => pattern.test(pathname))) {
    return "authenticated";
  }

  if (UNAUTHENTICATED_ONLY_PATHS.some((pattern) => pattern.test(pathname))) {
    return "unauthenticated";
  }

  return "public";
};

export const getAuthRedirectPath = (pathname: string, isAuthenticated: boolean): string | null => {
  const routeAccess = getRouteAccess(pathname);

  if (routeAccess === "authenticated" && !isAuthenticated) {
    return "/login";
  }

  if (routeAccess === "unauthenticated" && isAuthenticated) {
    return "/";
  }

  return null;
};
