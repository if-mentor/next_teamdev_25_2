"use client";

import Link from "next/link";
import { useState, type ChangeEvent, type FormEvent } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import {
  normalizeSignupValues,
  validateSignupValues,
  type SignupField,
  type SignupFieldErrors,
  type SignupValues,
} from "@/features/signup/validation";
import styles from "./styles.module.css";

const INITIAL_VALUES: SignupValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

type SignupResponse = {
  message?: string;
  fieldErrors?: SignupFieldErrors;
};

export default function SignupForm() {
  const [values, setValues] = useState<SignupValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<SignupFieldErrors>({});
  const [formMessage, setFormMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const field = event.target.name as SignupField;
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setFormMessage("");
  };

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const field = event.target.name as SignupField;
    const normalized = normalizeSignupValues(values);
    const validation = validateSignupValues(normalized);

    setValues(normalized);
    setErrors((current) => ({
      ...current,
      [field]: validation.success ? undefined : validation.errors[field],
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormMessage("");
    setIsSuccess(false);

    const validation = validateSignupValues(values);
    setValues(validation.data);

    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });
      const result = (await response.json()) as SignupResponse;

      if (!response.ok) {
        setErrors(result.fieldErrors ?? {});
        setFormMessage(result.message ?? "登録に失敗しました。時間をおいてからもう一度お試しください");
        return;
      }

      setValues(INITIAL_VALUES);
      setIsSuccess(true);
      setFormMessage(result.message ?? "登録が完了しました");
    } catch {
      setFormMessage("通信に失敗しました。接続を確認してもう一度お試しください");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.fieldList}>
        <Input
          id="name"
          name="name"
          type="text"
          label="名前"
          placeholder="山田 太郎"
          autoComplete="name"
          value={values.name}
          error={errors.name}
          variantSize="medium"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          required
        />
        <Input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          label="メールアドレス"
          placeholder="example@email.com"
          autoComplete="email"
          value={values.email}
          error={errors.email}
          variantSize="medium"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          required
        />
        <Input
          id="password"
          name="password"
          type="password"
          label="パスワード"
          placeholder="8〜24文字で入力"
          autoComplete="new-password"
          value={values.password}
          error={errors.password}
          variantSize="medium"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          required
        />
        <Input
          id="passwordConfirmation"
          name="passwordConfirmation"
          type="password"
          label="パスワード（確認）"
          placeholder="もう一度入力"
          autoComplete="new-password"
          value={values.passwordConfirmation}
          error={errors.passwordConfirmation}
          variantSize="medium"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          required
        />
      </div>

      {formMessage && (
        <p className={isSuccess ? styles.successMessage : styles.errorMessage} role={isSuccess ? "status" : "alert"}>
          {formMessage}
        </p>
      )}

      <Button
        type="submit"
        label={isSubmitting ? "登録中…" : "新規登録"}
        variant="secondary"
        size="large"
        disabled={isSubmitting}
      />

      <p className={styles.loginGuide}>
        すでにアカウントをお持ちですか？
        <Link href="/login">ログイン</Link>
      </p>
    </form>
  );
}
