import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import Card from "@/components/Card";
import styles from "./styles.module.css";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

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
            posts.map((data) => (
              <div key={data.id}>
                <Link href={`/articles/${data.id}`}>
                  <Card
                    id={data.id.toString()}
                    title={data.title}
                    author={data.users.name}
                    category={data.categories.name}
                    thumbnailUrl={data.image_path}
                    content={data.content}
                    createdAt={new Date(data.created_at).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                      second: "2-digit",
                    })}
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
