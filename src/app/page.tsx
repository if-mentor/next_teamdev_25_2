import Button from "@/components/Button";
import { CardProps } from "@/components/Card/type";
import Input from "@/components/Input";
import Link from "next/link";
import Card from "@/components/Card";
import Header from "@/components/Header";
import styles from "./styles.module.css";

const DUMMY_Data: CardProps[] = [
  {
    id: "1",
    title: "記事タイトル",
    author: "山田　太郎",
    category: "テック",
    thumbnailUrl: "/sample1.jpg",
    content: "この記事では～について解説します",
    createdAt: "2026-5-31",
  },
  {
    id: "2",
    title: "記事タイトル",
    author: "山田　太郎",
    category: "テック",
    thumbnailUrl: "/sample2.jpg",
    content: "この記事では～について解説します",
    createdAt: "2026-5-31",
  },
  {
    id: "3",
    title: "記事タイトル",
    author: "山田　太郎",
    category: "テック",
    thumbnailUrl: "/sample3.jpg",
    content: "この記事では～について解説します",
    createdAt: "2026-5-31",
  },
  {
    id: "4",
    title: "記事タイトル",
    author: "山田　太郎",
    category: "テック",
    thumbnailUrl: "/sample4.jpg",
    content: "この記事では～について解説します",
    createdAt: "2026-5-31",
  },
  {
    id: "5",
    title: "記事タイトル",
    author: "山田　太郎",
    category: "テック",
    thumbnailUrl: "/sample5.jpg",
    content: "この記事では～について解説します",
    createdAt: "2026-5-31",
  },
];

export default function Home() {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.search}>
          <Input
            id="search"
            type="search"
            name="search"
            placeholder="検索したい記事を入力してください"
            variantSize="medium"
            disabled={false}
          />
          <Button variant="secondary" size="medium" label="検索"></Button>
        </div>
        <div className={styles.articlesList}>
          {DUMMY_Data.map((data) => (
            <div key={data.id}>
              <Link href={`/articles/${data.id}`}>
                <Card
                  id={data.id}
                  title={data.title}
                  author={data.author}
                  category={data.category}
                  thumbnailUrl={data.thumbnailUrl}
                  content={data.content}
                  createdAt={data.createdAt}
                />
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
