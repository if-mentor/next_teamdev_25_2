// Supabaseに接続するためのcreateServerSupabaseClient関数を読み込む
import { createServerSupabaseClient } from "@/libs/supabase/server";

// GETリクエストを受け取ったときに実行される処理を定義する
export async function GET() {
  // Supabaseクライアントを作成する
  const supabase = createServerSupabaseClient();
  // Supabaseのcategoriesテーブルからidとnameを取得する
  const { data, error } = await supabase
    .from("categories")
    .select("id,name")
    // idの昇順でカテゴリを並べる
    .order("id", { ascending: true });

  // Supabaseからデータを取得するときにエラーが発生した場合の処理
  if (error) {
    // エラーの内容をターミナルのコンソールに表示する
    console.error("カテゴリ取得エラー：", error);

    // エラーが発生したことをクライアントにJSON形式で返す
    return Response.json({ error: "カテゴリの取得に失敗しました" }, { status: 500 });
  }

  // Supabaseから取得したカテゴリデータをJSON形式でクライアントに返す
  return Response.json(data);
}
