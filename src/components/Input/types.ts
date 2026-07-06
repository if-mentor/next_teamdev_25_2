export type InputProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  disabled: boolean;
  error: string;
  name: string;
  type: string;
  size: "medium" | "large";
};
