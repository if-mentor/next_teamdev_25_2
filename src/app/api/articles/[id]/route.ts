import { createClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: number }> }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const { id } = await params;

  const { data: post, error } = await supabase.from("posts").select("*").eq("id", id).single();

  if (error || !post) {
    return Response.json({ error: "記事が見当たりません" }, { status: 404 });
  }

  // ユーザーのidと記事のuser_idが一致した場合のみ削除
  if (post.user_id !== user.id) {
    return Response.json({ error: "この投稿を削除する権限はありません" }, { status: 403 });
  }
  const { error: deleteError } = await supabase.from("posts").delete().eq("id", id);

  if (deleteError) {
    return Response.json({ error: "削除に失敗しました" }, { status: 500 });
  }

  // ストレージの画像も削除する
  //   const {data}=await supabase.storage
  //   .from("blog_image/posts")
  //   .remove([post.image_path])
  //   if(error){
  //     console.error("画像削除エラー：",error)
  //   }

  return Response.json({
    success: true,
    message: "記事を削除しました",
  });
}
