export type InputProps = React.ComponentProps<"input"> & {
  label?: string;
  error?: string;
  variantSize: "medium" | "large";
};
