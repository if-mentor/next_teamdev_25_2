"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./styles.module.css";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <nav className={styles.nav} aria-label="ヘッダーナビゲーション">
          {isAuthenticated ? (
            <>
              <Link href="/articles/new" className={`${styles.button} ${styles.outlineButton}`}>
                新規作成
              </Link>
              <button
                type="button"
                className={`${styles.button} ${styles.primaryButton}`}
                onClick={() => setIsAuthenticated(false)}
              >
                ログアウト
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={`${styles.button} ${styles.outlineButton}`}>
                ログイン
              </Link>
              <Link href="/signup" className={`${styles.button} ${styles.primaryButton}`}>
                新規登録
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
