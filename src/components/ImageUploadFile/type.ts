export type ImageUploadFileProps = {
  imageFile?: File | null;
  accept?: string;
  maxFileSize?: number;
  disabled?: boolean;
  onErrorChange?: (hasError: boolean) => void;
};
