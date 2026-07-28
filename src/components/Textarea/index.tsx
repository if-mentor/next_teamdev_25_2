import styles from "./styles.module.css";
import { TextareaProps } from "./types";

export default function Textarea({ label, error = "", ...textareaProps }: TextareaProps) {
  const hasError = error !== "";

  return (
    <div>
      <label htmlFor={textareaProps.id} className={styles.label}>
        {label}
      </label>
      <textarea
        className={`${styles.textarea} ${hasError && styles.textarea_error}`}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${textareaProps.name}-error` : undefined}
        {...textareaProps}
      />
      {hasError && (
        <p id={`${textareaProps.name}-error`} className={styles.textarea_error_message}>
          {error}
        </p>
      )}
    </div>
  );
}
