import type { InputProps } from "./types";
import styles from "./styles.module.css";

const Input = ({ label, error = "", variantSize = "medium", ...inputProps }: InputProps) => {
  const hasError = error !== "";

  return (
    <div>
      <label htmlFor={inputProps.id} className={styles.label}>
        {label}
      </label>
      <input
        className={`${styles.input} ${styles[variantSize]} ${hasError && styles.input_error}`}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${inputProps.name}-error` : undefined}
        {...inputProps}
      />
      {hasError && (
        <p id={`${inputProps.name}-error`} className={styles.input_error_message}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
