import styles from "./styles.module.css";
import Image from "next/image";
import type { CommentCardProps } from "./type";

// 投稿日時から「〇時間前」を計算して返す関数
const formatElapsedTime = (created_at: string): string => {
  // 投稿時刻の文字列をDateオブジェクトに変換
  const created = new Date(created_at);
  // 現在の日時を取得
  const now = new Date();
  // 現在時刻と投稿時刻の差をミリ秒で取得する
  const diff = now.getTime() - created.getTime();
  // ミリ秒を時間に変換する
  const hours = Math.floor(diff / (1000 * 60 * 60));

  // 「〇時間前」という文字列を返す
  return `${hours}時間前`;
};

export default function CommentCard({ userName, userAvatarUrl, content, created_at }: CommentCardProps) {
  return (
    <>
      <div className={styles.commentcard}>
        <Image src={userAvatarUrl ?? "/default_user_icon.png"} alt="ユーザーアイコン" width={32} height={32} />
        <div className={styles.right}>
          <div className={styles.header}>
            <p className={styles.username}>{userName}</p>
            <p className={styles.created_at}>{formatElapsedTime(created_at)}</p>
          </div>

          <p className={styles.content}>{content}</p>
        </div>
      </div>
    </>
  );
}
