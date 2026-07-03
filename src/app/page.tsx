import Card from "@/components/Card";
import styles from "./styles.module.css";

export default function Home() {
  return (
    <div>
      <h1 className={styles.title}>Hello Teamdev!!</h1>

      <Card
        title="チーム開発"
        author="山田太郎"
        category="プログラミング"
        thumbnailUrl="/sample1.jpg"
        content="これは例です。これは例です。これは例です。これは例です。これは例です。これは例です。これは例です。これは例です。"
        createdAt="2 min ago"
      />
    </div>
  );
}
