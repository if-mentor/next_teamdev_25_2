"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import ImageUploadFile from "@/components/ImageUploadFile";
import Input from "@/components/Input";
import SelectBox from "@/components/SelectBox";
import styles from "./styles.module.css";
import { validatePostValues } from "@/features/articles/validation";
import { createClient } from "@/libs/supabase/client";

// categoriesテーブルから取得するデータの型
type Category = {
  id: number;
  name: string;
};

export default function NewArticlePage() {
  // Supabaseから取得したカテゴリを保存する
  const [categories, setCategories] = useState<Category[]>([]);
  // バリデーションエラーを保存するstate
  const [errors, setErrors] = useState<Record<string, string>>({});
  // ImageUploadFileで画像エラーが発生しているか
  const [imageError, setImageError] = useState(false);

  // ページが表示されたときにカテゴリを取得する
  useEffect(() => {
    // categoriesを取得する非同期関数
    const fetchCategories = async () => {
      // route.tsのAPIにGETリクエストを送る
      const response = await fetch("/api/categories");

      // レスポンスが正常でない場合
      if (!response.ok) {
        console.error("レスポンスの取得に失敗しました");
        return;
      }

      // APIから返ってきたJSONデータを取得する
      const data = await response.json();
      // 取得したカテゴリをstateに保存する
      setCategories(data);
    };

    // カテゴリ取得処理を実行する
    fetchCategories();
  }, []);

  // SelectBoxで使用する形式にカテゴリを変換する
  const categoryOptions = categories.map((category) => ({
    id: category.id,
    value: category.name,
  }));

  // 指定した項目のバリデーションエラーを削除する
  const clearError = (field: string) => {
    setErrors((prevErrors) => {
      // 現在のエラーをコピーする
      const newErrors = { ...prevErrors };
      // 指定された項目のエラーを削除する
      delete newErrors[field];

      // 更新したエラーを返す
      return newErrors;
    });
  };

  // フォームが送信されたときに実行する処理
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // フォーム送信によるページの再読み込みを防ぐ
    event.preventDefault();

    // フォームに入力された値を取得する
    const formData = new FormData(event.currentTarget);
    // バリデーションに渡す値をまとめる
    const values = {
      // titleというnameを持つ入力欄の値を取得する
      title: formData.get("title"),
      // imageというnameを持つファイル入力の値を取得する
      image: formData.get("image"),
      // categoryIdというnameを持つSelectBoxの値を取得する
      categoryId: formData.get("categoryId"),
      // contentというnameを持つtextareaの値を取得する
      content: formData.get("content"),
    };

    // 作成したバリデーション関数を実行する
    const result = validatePostValues(values);

    // バリデーションに失敗した場合
    if (!result.success) {
      // バリデーションエラーをstateに保存する
      setErrors(result.errors);
      // 確認メッセージをログに表示
      console.log("バリデーションがあるので記事投稿はできません。");

      // エラーがあるのでここで処理を終了する
      return;
    }

    // バリデーションに成功した場合はエラーをクリアする
    setErrors({});

    // Supabaseクライアントを作成する
    const supabase = createClient();
    // バリデーション済みの画像ファイルを取得する
    const imageFile = result.data.image;

    // 画像が存在しない場合は処理を終了する
    if (!imageFile) {
      console.error("画像ファイルが選択されていません");
      return;
    }

    // UUIDと元のファイル名を組み合わせてStorageの保存先を作成する
    const filePath = `blog_image/posts/${crypto.randomUUID()}`;
    // teamdevバケットのpostsフォルダへ画像をアップロードする
    const { error: uploadError } = await supabase.storage.from("teamdev").upload(filePath, imageFile);

    // 画像のアップロードに失敗した場合
    if (uploadError) {
      console.error("画像のアップロードに失敗しました:", uploadError);
      return;
    }

    // Storageに保存された画像のパスをimagePathとして取得する
    const imagePath = filePath;
    // 画像の保存先を確認する
    console.log("画像のアップロードに成功しました:", imagePath);

    // APIに投稿データを送る
    const response = await fetch("/api/posts", {
      // HTTPメソッドにPOSTを指定する
      method: "POST",
      // APIに送るデータがJSON形式であることを指定する
      headers: {
        "Content-Type": "application/json",
      },

      // 投稿するデータをJSON形式の文字列に変換して送る
      body: JSON.stringify({
        // バリデーション済みのタイトルを送る
        title: result.data.title,
        // バリデーション済みのカテゴリIDを送る
        categoryId: result.data.categoryId,
        // バリデーション済みの本文を送る
        content: result.data.content,
        // Storageに保存した画像のパスをAPIへ送る
        imagePath: imagePath,
      }),
    });

    // APIから返ってきたレスポンスが正常ではない場合
    if (!response.ok) {
      // エラーの内容をブラウザのコンソールに表示する
      console.error("記事の投稿に失敗しました");
      // エラーが発生したのでここで処理を終了する
      return;
    }

    // APIから返ってきたJSONデータを取得する
    const data = await response.json();
    // 投稿に成功したことと、APIから返ってきたデータをコンソールに表示する
    console.log("記事の投稿に成功しました：", data);
  };

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="タイトルを入力"
            aria-label="記事タイトル"
            variantSize="large"
            required
            onChange={() => clearError("title")}
          />
          {errors.title && <p className={styles.errorMessage}>{errors.title}</p>}
        </div>

        <div className={styles.field}>
          <ImageUploadFile
            onErrorChange={(hasError) => {
              setImageError(hasError);

              // 正常な画像が選択された場合
              if (!hasError) {
                clearError("image");
              }
            }}
          />
          {!imageError && errors.image && <p className={styles.errorMessage}>{errors.image}</p>}
        </div>

        <div className={styles.category}>
          <SelectBox
            id="category"
            name="categoryId"
            label="カテゴリ"
            placeholder="カテゴリ選択"
            options={categoryOptions}
            defaultValue=""
            required
            onChange={() => clearError("categoryId")}
          />
          {errors.categoryId && <p className={styles.errorMessage}>{errors.categoryId}</p>}
        </div>

        <div className={styles.field}>
          <textarea
            id="body"
            name="content"
            className={styles.bodyInput}
            placeholder="本文を入力"
            aria-label="記事本文"
            required
            onChange={() => clearError("content")}
          />
          {errors.content && <p className={styles.errorMessage}>{errors.content}</p>}
        </div>

        <div className={styles.submitButton}>
          <Button type="submit" label="投稿" variant="success" size="medium" />
        </div>
      </form>
    </main>
  );
}
