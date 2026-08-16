import styles from "./styles.module.css";
import Image from "next/image";
import Button from "@/components/Button";
import CommentForm from "@/components/CommentForm";
import CommentCard from "@/components/CommentCard";

import { createServerSupabaseClient } from "@/libs/supabase/server";

type ArticleDetailProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ArticleDetail({ params }: ArticleDetailProps) {
  const { id } = await params;

  const supabase = createServerSupabaseClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select(
      `
    *,
    users (
      name,
      image_path
    ),
    categories (
      name
    )
  `,
    )
    .eq("id", id)
    .single();

  if (error || !post) {
    return <p>記事の取得に失敗しました。</p>;
  }

  const { data: imageData } = supabase.storage.from("teamdev").getPublicUrl(post.image_path);
  const userImagePath = post.users?.image_path;
  const userIconUrl = userImagePath
    ? supabase.storage.from("teamdev").getPublicUrl(userImagePath).data.publicUrl
    : "/default_user_icon.png";

  const createdAt = new Date(post.created_at).toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Tokyo",
  });
  return (
    <>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.header}>
            <p className={styles.title}>{post.title}</p>

            <div className={styles.authorIcon}>
              <p className={styles.author}>{post.users?.name}</p>
              <Image src={userIconUrl} alt="アイコン" width={32} height={32} />
            </div>
          </div>

          <Image className={styles.articlePicture} src={imageData.publicUrl} alt="記事写真" width={640} height={320} />

          <div className={styles.categoryWrapper}>
            <p className={styles.category}>{post.categories?.name}</p>
          </div>

          <div className={styles.text}>
            <p>{post.content}</p>
          </div>

          <div className={styles.buttonWrapper}>
            <Button label="編集" variant="success" size="medium" />
          </div>

          <div className={styles.timeWrapper}>
            <p className={styles.time}>{createdAt}</p>
          </div>
        </div>
      </div>

      <div className={styles.commentWrapper}>
        <p className={styles.comment}>◯◯件のコメント</p>
      </div>

      <div className={styles.commentForm}>
        <CommentForm />
      </div>

      <div className={styles.commentCard}>
        <CommentCard
          userName="テスト 太郎"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ligula nibh, interdum non enim sit amet, iaculis aliquet nunc."
          createdDate="2026-07-23T05:12:00+09:00"
        />
      </div>

      <div className={styles.commentCard}>
        <CommentCard
          userName="テスト 太郎"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ligula nibh, interdum non enim sit amet, iaculis aliquet nunc."
          createdDate="2026-07-22T05:12:00+09:00"
        />
      </div>
    </>
  );
}
