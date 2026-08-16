import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import { headers } from "next/headers";
import Card from "@/components/Card";
import styles from "./styles.module.css";

import { formatElapsedTime } from "@/utils/formatElapsedTime";
import { Post } from "@/types/articles";

export default async function Home() {
  const headerList = await headers();
  const host = headerList.get("host");
  const protocol = headerList.get("x-forwarded-proto") ?? "http";

  const res = await fetch(`${protocol}://${host}/api/articles`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch articles: ${res.status}`);
  }

  const posts: Post[] = await res.json();

  if (!posts) {
    throw new Error("Failed to fetch articles: empty response");
  }

  return (
    <div>
      <main className={styles.main}>
        <form>
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
        </form>

        <div className={styles.articlesList}>
          {posts.length === 0 ? (
            <p>記事がありません</p>
          ) : (
            posts.map((post) => (
              <div key={post.id}>
                <Link href={`/articles/${post.id}`}>
                  <Card
                    id={post.id.toString()}
                    title={post.title}
                    author={post.users.name}
                    category={post.categories.name}
                    thumbnailUrl={`${process.env.SUPABASE_URL}/storage/v1/object/public/teamdev/${post.image_path}`}
                    content={post.content}
                    createdAt={formatElapsedTime(post.created_at)}
                  />
                </Link>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
