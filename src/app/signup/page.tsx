"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Header from "@/components/Header";
import Link from "next/link";
import style from "./style.module.css";
import { useState } from "react";

const Signup = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className={style.container}>
      <Header />
      <form className={style.signup_container}>
        <p className={style.signup_title}>新規登録</p>
        <div className={style.signup_form}>
          <Input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="名前"
            variantSize="medium"
            placeholder="名前を入力"
          />
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="メールアドレス"
            variantSize="medium"
            placeholder="メールアドレスを入力"
          />
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="パスワード"
            variantSize="medium"
            placeholder="パスワードを入力"
          />
          <Button className={style.signup_button} type="submit" label="登録する" variant="success" size="large" />
        </div>
        <p className={style.signup_paragraph}>
          すでにアカウトをお持ちの方は
          <Link className={style.signup_link} href="/login">
            ログイン
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
