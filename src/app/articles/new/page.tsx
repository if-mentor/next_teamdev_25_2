import Button from "@/components/Button";
import ImageUploadFile from "@/components/ImageUploadFile";
import Input from "@/components/Input";
import SelectBox from "@/components/SelectBox";
import styles from "./styles.module.css";

const categoryOptions = [
  { id: 1, value: "フロントエンド" },
  { id: 2, value: "バックエンド" },
  { id: 3, value: "インフラ" },
  { id: 4, value: "その他" },
];

export default function NewArticlePage() {
  return (
    <main className={styles.main}>
      <form className={styles.form}>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="タイトルを入力"
          aria-label="記事タイトル"
          variantSize="large"
          required
        />

        <ImageUploadFile />

        <div className={styles.category}>
          <SelectBox
            id="category"
            name="category"
            label="カテゴリ"
            placeholder="カテゴリ選択"
            options={categoryOptions}
            defaultValue=""
            required
          />
        </div>

        <textarea
          id="body"
          name="body"
          className={styles.bodyInput}
          placeholder="本文を入力"
          aria-label="記事本文"
          required
        />

        <div className={styles.submitButton}>
          <Button type="submit" label="投稿" variant="success" size="medium" />
        </div>
      </form>
    </main>
  );
}
