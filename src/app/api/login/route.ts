import { createServerSupabaseClientWithCookies } from "../../../libs/supabase/serverCookies";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email) {
      return NextResponse.json({ message: "メールアドレスが不正です。" }, { status: 400 });
    }
    if (!password) {
      return NextResponse.json({ message: "パスワードが不正です。" }, { status: 400 });
    }

    const supabase = await createServerSupabaseClientWithCookies();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ message: "メールアドレスまたはパスワードが正しくありません" }, { status: 401 });
    }

    return NextResponse.json({
      message: "ログインしました",
      user: {
        id: data.user.id,
        email: data.user.email,
      },
    });
  } catch {
    return NextResponse.json({ message: "リクエストの処理に失敗しました" }, { status: 500 });
  }
}
