"use client";

import type { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.css";

type ButtonVariant = "primary" | "secondary" | "success" | "danger";
type ButtonSize = "medium" | "large";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const Button = ({ label, variant = "primary", size = "medium", className, ...buttonProps }: ButtonProps) => {
  const buttonClassName = [styles.button, styles[variant], styles[size], className].filter(Boolean).join(" ");

  return (
    <button className={buttonClassName} {...buttonProps}>
      {label}
    </button>
  );
};

export default Button;
