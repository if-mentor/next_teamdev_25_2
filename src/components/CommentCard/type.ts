export interface CommentCardProps {
  // ユーザー名
  userName: string;
  // ユーザーアイコン画像URL
  userAvatarUrl?: string;
  // コメント本文
  content: string;
  // 投稿日時
  createdDate: string;
}
