import type { InputProps } from "./types";
import styles from "./styles.module.css";

const Input = ({ value, onChange, label, placeholder, disabled, error, name, type, size }: InputProps) => {
  const hasError = error !== "";

  return (
    <div>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        className={`${styles.input} ${size === "medium" ? styles.medium : styles.large} ${hasError ? styles.input_error : ""}`}
        onChange={onChange}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${name}-error` : undefined}
      />
      {hasError && (
        <p id={`${name}-error`} className={styles.input_error_message}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
