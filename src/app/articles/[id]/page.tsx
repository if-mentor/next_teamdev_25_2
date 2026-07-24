import styles from "./styles.module.css";
import Image from "next/image";
import Button from "@/components/Button";
import CommentForm from "@/components/CommentForm";
import CommentCard from "@/components/CommentCard";

export default function ArticleDetail() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.flex}>
          <p className={styles.title}>Blog Title</p>
          <div className={styles.authoricon}>
            <p className={styles.author}>Author</p>
            <Image src="/default_user_icon.png" alt="アイコン" width={32} height={32} />
          </div>
        </div>
        <Image className={styles.articlepicture} src="/sample1.jpg" alt="記事写真" width={640} height={320} />
        <p className={styles.category}>Category</p>
        <div className={styles.divcontent}>
          <p>こんにちは〜についてのブログを書きます。</p>
          <p>今日はいいお天気で〜をして楽しみました。</p>
        </div>
        <div className={styles.divcontent}>
          <p>とてもいい事がありまして、詳細は〜です。</p>
          <p>最後まで読んで下さり、ありがとうございました。</p>
        </div>
        <div className={styles.button}>
          <Button label="編集" variant="success" size="medium" />
        </div>
        <p className={styles.time}>a min ago</p>
      </div>
      <p className={styles.comment}>◯◯件のコメント</p>
      <div className={styles.commentform}>
        <CommentForm />
      </div>
      <div className={styles.commetcard}>
        <CommentCard
          userName="テスト 太郎"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ligula nibh, interdum non enim sit amet, iaculis aliquet nunc."
          createdDate="2026-07-23T05:12:00+09:00"
        />
      </div>
      <div className={styles.commetcard}>
        <CommentCard
          userName="テスト 太郎"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ligula nibh, interdum non enim sit amet, iaculis aliquet nunc."
          createdDate="2026-07-22T05:12:00+09:00"
        />
      </div>
    </>
  );
}
