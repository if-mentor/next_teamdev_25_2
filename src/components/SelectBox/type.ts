import type { ComponentPropsWithoutRef } from "react";

export type SelectBoxOption = {
  id: number;
  value: string;
};

export type SelectBoxProps = Pick<ComponentPropsWithoutRef<"select">, "disabled" | "onChange"> & {
  label?: string;
  options: SelectBoxOption[];
  placeholder?: string;
};
