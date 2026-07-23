import type { Metadata } from "next";
import SignupForm from "./SignupForm";
import styles from "./styles.module.css";

export const metadata: Metadata = {
  title: "新規登録 | チーム開発",
};

export default function SignupPage() {
  return (
    <main className={styles.main}>
      <section className={styles.card} aria-labelledby="signup-title">
        <div className={styles.heading}>
          <p className={styles.eyebrow}>WELCOME</p>
          <h1 id="signup-title">新規登録</h1>
          <p>必要な情報を入力して、アカウントを作成してください。</p>
        </div>
        <SignupForm />
      </section>
    </main>
  );
}
