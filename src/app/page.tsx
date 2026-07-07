import Card from "@/components/Card";

export default function Home() {
  return (
    <>
      <Card
        title="記事タイトル"
        author="山田 太郎"
        category="テック"
        thumbnailUrl="/sample1.jpg"
        content="この記事では～について解説します"
        createdAt="2026-05-31"
      />
    </>
  );
}
