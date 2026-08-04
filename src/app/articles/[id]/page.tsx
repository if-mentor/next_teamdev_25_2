import styles from "./styles.module.css";
import Image from "next/image";
import Button from "@/components/Button";
import CommentForm from "@/components/CommentForm";
import CommentCard from "@/components/CommentCard";

export default function ArticleDetail() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.header}>
            <p className={styles.title}>Blog Title</p>

            <div className={styles.authorIcon}>
              <p className={styles.author}>Author</p>
              <Image src="/default_user_icon.png" alt="アイコン" width={32} height={32} />
            </div>
          </div>

          <Image className={styles.articlePicture} src="/sample1.jpg" alt="記事写真" width={640} height={320} />

          <div className={styles.categoryWrapper}>
            <p className={styles.category}>Category</p>
          </div>

          <div className={styles.text}>
            <p>こんにちは〜についてのブログを書きます。</p>
            <p>今日はいいお天気で〜をして楽しみました。</p>
          </div>

          <div className={styles.text}>
            <p>とてもいい事がありまして、詳細は〜です。</p>
            <p>最後まで読んで下さり、ありがとうございました。</p>
          </div>

          <div className={styles.buttonWrapper}>
            <Button label="編集" variant="success" size="medium" />
          </div>

          <div className={styles.timeWrapper}>
            <p className={styles.time}>a min ago</p>
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
