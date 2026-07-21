"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import Input from "../Input";
import Button from "../Button";

export default function CommentForm() {
  // コメントの状態管理
  const [comment, setComment] = useState("");

  // 入力内容が変更されたときに呼ばれる関数
  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 入力欄に現在入力されている文字列を取得し、commentのstateを更新する
    setComment(event.target.value);
  };

  return (
    <>
      <form>
        <div className={styles.commentForm}>
          <Input
            type="text"
            name="comment"
            value={comment}
            placeholder="コメントを入力"
            disabled={false}
            variantSize="large"
            onChange={handleCommentChange}
          />
          <Button label="コメント" variant="success" size="medium" className={styles.commentButton} />
        </div>
      </form>
    </>
  );
}
