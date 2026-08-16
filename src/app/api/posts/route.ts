// Supabaseに接続するためのcreateServerSupabaseClient関数を読み込む
import { createServerSupabaseClient } from "@/libs/supabase/server";

// POSTリクエストを受け取ったときに実行される処理を定義する
export async function POST(request: Request) {
  // Supabaseクライアントを作成する
  const supabase = createServerSupabaseClient();
  // リクエストからJSONデータを取得する
  const body = await request.json();
  // 送られてきたデータを取り出す
  const { title, content, categoryId, imagePath } = body;
  console.log("APIで受け取った値:", {
    title,
    content,
    categoryId,
    imagePath,
  });
  // postsテーブルに記事を登録する
  const { data, error } = await supabase
    .from("posts")
    .insert({
      title,
      content,
      category_id: Number(categoryId),
      image_path: imagePath,
    })
    // 登録した記事を返してもらう
    .select()
    // 1件だけ取得する
    .single();

  // Supabaseでエラーが発生した場合
  if (error) {
    // エラーの内容をターミナルに表示する
    console.error("記事投稿エラー：", error);

    // エラーが発生したことをクライアントにJSON形式で返す
    return Response.json({ error: "記事の投稿に失敗しました" }, { status: 500 });
  }

  // 登録した記事をクライアントに返す
  return Response.json(data, { status: 201 });
}
