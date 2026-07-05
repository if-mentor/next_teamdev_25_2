"use client";

import styles from "./styles.module.css";
import type { SelectBoxProps } from "./type";
import { ChevronDown } from "lucide-react";

export default function SelectBox({ label, options, placeholder, ...selectProps }: SelectBoxProps) {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={selectProps.id}>
        {label}
      </label>
      <div className={styles.selectWrapper}>
        <select className={styles.select} {...selectProps}>
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.value}
            </option>
          ))}
        </select>
        <ChevronDown className={styles.arrow} size={16} />
      </div>
    </div>
  );
}
