"use client";

import { useState } from "react";
import Link from "next/link";

import Button from "@/components/Button";
import Input from "@/components/Input";

import styles from "./styles.module.css";

const LoginForm = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  return (
    <form className={styles.form}>
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
          onChange={(event) =>
            setFormValues((prev) => ({
              ...prev,
              email: event.target.value,
            }))
          }
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
          onChange={(event) =>
            setFormValues((prev) => ({
              ...prev,
              password: event.target.value,
            }))
          }
          required
        />
      </div>

      <div className={styles.buttonArea}>
        <Button type="button" label="ログイン" variant="success" size="medium" className={styles.loginButton} />
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
