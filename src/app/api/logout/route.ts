import { createClient } from "@/libs/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("エラー：", error);

    return NextResponse.json({ error: "ログアウトに失敗しました" }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: "ログアウトしました",
  });
}
