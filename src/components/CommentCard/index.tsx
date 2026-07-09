import styles from "./styles.module.css";
import Image from "next/image";
import type { CommentCardProps } from "./type";
import { formatElapsedTime } from "@/utils/formatElapsedTime";

export default function CommentCard({ userName, userAvatarUrl, content, createdDate }: CommentCardProps) {
  return (
    <>
      <div className={styles.commentCard}>
        <Image src={userAvatarUrl ?? "/default_user_icon.png"} alt="ユーザーアイコン" width={32} height={32} />
        <div className={styles.right}>
          <div className={styles.header}>
            <p className={styles.userName}>{userName}</p>
            <p className={styles.createdDate}>{formatElapsedTime(createdDate)}</p>
          </div>

          <p className={styles.content}>{content}</p>
        </div>
      </div>
    </>
  );
}
