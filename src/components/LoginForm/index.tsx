"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Button from "@/components/Button";
import Input from "@/components/Input";

import styles from "./styles.module.css";

const LoginForm = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormMessage("");
    const { name, value } = event.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const nextErrors = {
      email: "",
      password: "",
    };

    if (!formValues.email) {
      nextErrors.email = "メールアドレスを入力してください";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      nextErrors.email = "メールアドレスの形式が正しくありません";
    }

    if (!formValues.password) {
      nextErrors.password = "パスワードを入力してください";
    }

    setErrors(nextErrors);

    return !nextErrors.email && !nextErrors.password;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormMessage("");
    if (isSubmitting) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const result = await response.json();

      if (!response.ok) {
        setFormMessage(result.message ?? "メールアドレスまたはパスワードが正しくありません");
        return;
      }

      router.push("/");
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h1 className={styles.title}>ログイン</h1>

      <div className={styles.inputArea}>
        <Input
          id="email"
          name="email"
          type="email"
          label="メールアドレス"
          placeholder="メールアドレスを入力"
          variantSize="medium"
          value={formValues.email}
          error={errors.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.inputArea}>
        <Input
          id="password"
          name="password"
          type="password"
          label="パスワード"
          placeholder="パスワードを入力"
          variantSize="medium"
          value={formValues.password}
          error={errors.password}
          onChange={handleChange}
          required
        />
      </div>

      {formMessage && (
        <p className={styles.errorMessage} role="alert">
          {formMessage}
        </p>
      )}

      <div className={styles.buttonArea}>
        <Button
          type="submit"
          label={isSubmitting ? "ログイン中..." : "ログイン"}
          variant="success"
          size="medium"
          className={styles.loginButton}
          disabled={isSubmitting}
        />
      </div>

      <p className={styles.signupText}>
        アカウントをお持ちでない方は
        <Link href="/signup" className={styles.signUpLink}>
          新規登録
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
