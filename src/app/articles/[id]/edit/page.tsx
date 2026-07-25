import Button from "@/components/Button";
import ImageUploadFile from "@/components/ImageUploadFile";
import Input from "@/components/Input";
import SelectBox from "@/components/SelectBox";
import { SelectBoxOption } from "@/components/SelectBox/type";
import styles from "./styles.module.css";
import Textarea from "@/components/Textarea";

const options: SelectBoxOption[] = [
  { id: 1, value: "テストA" },
  { id: 2, value: "テストB" },
  { id: 3, value: "長文テキスト長文テキスト長文テキスト長文テキスト長文テキスト" },
];

export default function EditArticlePage() {
  return (
    <form className={styles.form}>
      <Input id="title" name="title" type="text" variantSize="large" placeholder="タイトルを入力" required />

      <ImageUploadFile />

      <div className={styles.selectBox}>
        <SelectBox
          id="category"
          name="category"
          label="カテゴリ"
          options={options}
          placeholder="カテゴリ選択"
          defaultValue=""
          required
        />
      </div>

      <Textarea id="content" name="content" placeholder="本文を入力" required />

      <div className={styles.buttonWrapper}>
        <Button type="submit" label="更新" variant="success" />
        <Button type="button" label="削除" variant="danger" />
      </div>
    </form>
  );
}
