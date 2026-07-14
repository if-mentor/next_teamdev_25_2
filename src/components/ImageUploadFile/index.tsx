"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import type { ImageUploadFileProps } from "./type";

const DEFAULT_ACCEPT = "image/png,image/jpeg,image/jpg"; //画像のみ（png/jpeg/jpg）
const DEFAULT_MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"]; //ファイル形式

const ImageUploadFile = ({
  accept = DEFAULT_ACCEPT,
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
  disabled = false,
}: ImageUploadFileProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleClick = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setPreviewUrl(null);
      setErrorMessage("png / jpeg / jpg の画像を選択してください。");
      event.target.value = "";
      return;
    }

    if (file.size > maxFileSize) {
      setPreviewUrl(null);
      setErrorMessage("3MB以下の画像を選択してください。");
      event.target.value = "";
      return;
    }

    const objectUrl = URL.createObjectURL(file);

    setPreviewUrl(objectUrl);
    setErrorMessage("");
  };

  return (
    <div className={styles.wrapper}>
      <button type="button" className={styles.uploadArea} onClick={handleClick} disabled={disabled}>
        {previewUrl ? (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url(${previewUrl})` }}
            aria-label="アップロード画像のプレビュー"
          />
        ) : (
          <span className={styles.uploadButton}>画像アップロード</span>
        )}
      </button>

      <input ref={inputRef} type="file" accept={accept} disabled={disabled} onChange={handleChange} hidden />

      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};

export default ImageUploadFile;
