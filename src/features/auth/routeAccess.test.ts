import assert from "node:assert/strict";
import test from "node:test";
import { getAuthRedirectPath, getRouteAccess } from "./routeAccess.ts";

test("認証が必要なページを判定する", () => {
  assert.equal(getRouteAccess("/articles/new"), "authenticated");
  assert.equal(getRouteAccess("/articles/article-id/edit"), "authenticated");
  assert.equal(getRouteAccess("/profile"), "authenticated");
  assert.equal(getRouteAccess("/profile/settings"), "authenticated");
});

test("未認証である必要があるページを判定する", () => {
  assert.equal(getRouteAccess("/login"), "unauthenticated");
  assert.equal(getRouteAccess("/signup"), "unauthenticated");
});

test("その他のページは公開ページとして判定する", () => {
  assert.equal(getRouteAccess("/"), "public");
  assert.equal(getRouteAccess("/articles/article-id"), "public");
  assert.equal(getRouteAccess("/articles/new/edit"), "authenticated");
  assert.equal(getRouteAccess("/login/help"), "public");
});

test("未認証ユーザーを認証が必要なページからログインページへリダイレクトする", () => {
  const protectedPaths = [
    "/articles/new",
    "/articles/new/",
    "/articles/article-id/edit",
    "/articles/article-id/edit/",
    "/profile",
    "/profile/",
    "/profile/settings",
  ];

  protectedPaths.forEach((pathname) => {
    assert.equal(getAuthRedirectPath(pathname, false), "/login", pathname);
  });
});

test("認証済みユーザーは認証が必要なページを表示できる", () => {
  const protectedPaths = ["/articles/new", "/articles/article-id/edit", "/profile"];

  protectedPaths.forEach((pathname) => {
    assert.equal(getAuthRedirectPath(pathname, true), null, pathname);
  });
});

test("認証済みユーザーをゲスト専用ページからホームへリダイレクトする", () => {
  const guestOnlyPaths = ["/login", "/login/", "/signup", "/signup/"];

  guestOnlyPaths.forEach((pathname) => {
    assert.equal(getAuthRedirectPath(pathname, true), "/", pathname);
  });
});

test("未認証ユーザーはゲスト専用ページを表示できる", () => {
  assert.equal(getAuthRedirectPath("/login", false), null);
  assert.equal(getAuthRedirectPath("/signup", false), null);
});

test("公開ページでは認証状態にかかわらずリダイレクトしない", () => {
  const publicPaths = ["/", "/articles/article-id", "/login/help"];

  publicPaths.forEach((pathname) => {
    assert.equal(getAuthRedirectPath(pathname, false), null, `未認証: ${pathname}`);
    assert.equal(getAuthRedirectPath(pathname, true), null, `認証済み: ${pathname}`);
  });
});
