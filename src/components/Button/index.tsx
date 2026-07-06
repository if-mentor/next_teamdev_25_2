"use client";

import styles from "./styles.module.css";
import type { ButtonProps } from "./type";

const Button = ({ label, variant = "primary", size = "medium", className, ...buttonProps }: ButtonProps) => {
  const buttonClassName = [styles.button, styles[variant], styles[size], className].filter(Boolean).join(" ");

  return (
    <button className={buttonClassName} {...buttonProps}>
      {label}
    </button>
  );
};

export default Button;
