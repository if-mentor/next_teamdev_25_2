import Button from "@/components/Button";
import Input from "@/components/Input";
import styles from "./styles.module.css";
import CardSkeleton from "@/components/CardSkeleton";

export default function Loading() {
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
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </main>
    </div>
  );
}
