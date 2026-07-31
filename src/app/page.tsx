import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import Card from "@/components/Card";
import styles from "./styles.module.css";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { formatElapsedTime } from "@/utils/formatElapsedTime";

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: posts, error } = await supabase
    .from("posts")
    .select("id, title, users(name), categories(name), image_path, content, created_at")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  if (!posts) return notFound();

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
                    thumbnailUrl={post.image_path}
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
