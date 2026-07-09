// 投稿日時から「〇時間前」を計算して返す関数
export const formatElapsedTime = (createdDate: string): string => {
  // 投稿時刻の文字列をDateオブジェクトに変換
  const created = new Date(createdDate);
  // 現在の日時を取得
  const now = new Date();
  // 現在時刻と投稿時刻の差をミリ秒で取得する
  const diff = now.getTime() - created.getTime();
  // ミリ秒を分に変換する
  const minutes = Math.floor(diff / (1000 * 60));
  // ミリ秒を時間に変換する
  const hours = Math.floor(diff / (1000 * 60 * 60));
  // ミリ秒を日に変換する
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  // 1時間未満なら「〇分前」と返す
  if (minutes < 60) {
    return `${minutes}分前`;
  }
  // 24時間未満なら「〇時間前」と返す
  if (hours < 24) {
    return `${hours}時間前`;
  }
  // 24時間以上なら「〇日前」と返す
  return `${days}日前`;
};
