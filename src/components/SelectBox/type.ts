import type { ComponentProps } from "react";

export type SelectBoxOption = {
  id: number;
  value: string;
};

export type SelectBoxProps = ComponentProps<"select"> & {
  label?: string;
  options: SelectBoxOption[];
  placeholder?: string;
};
