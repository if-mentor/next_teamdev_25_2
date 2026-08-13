export const SIGNUP_LIMITS = {
  nameMax: 12,
  passwordMin: 8,
  passwordMax: 24,
} as const;

export type SignupValues = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type SignupField = keyof SignupValues;
export type SignupFieldErrors = Partial<Record<SignupField, string>>;

export type SignupValidationResult =
  | { success: true; data: SignupValues }
  | { success: false; data: SignupValues; errors: SignupFieldErrors };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const characterCount = (value: string) => Array.from(value).length;

const asTrimmedString = (value: unknown) => (typeof value === "string" ? value.trim() : "");

export const normalizeSignupValues = (values: Partial<Record<SignupField, unknown>>): SignupValues => ({
  name: asTrimmedString(values.name),
  email: asTrimmedString(values.email),
  password: asTrimmedString(values.password),
  passwordConfirmation: asTrimmedString(values.passwordConfirmation),
});

export const validateSignupValues = (values: Partial<Record<SignupField, unknown>>): SignupValidationResult => {
  const data = normalizeSignupValues(values);
  const errors: SignupFieldErrors = {};

  if (!data.name) {
    errors.name = "名前を入力してください";
  } else if (characterCount(data.name) > SIGNUP_LIMITS.nameMax) {
    errors.name = `名前は${SIGNUP_LIMITS.nameMax}文字以内で入力してください`;
  }

  if (!data.email) {
    errors.email = "メールアドレスを入力してください";
  } else if (!EMAIL_PATTERN.test(data.email)) {
    errors.email = "メールアドレスの形式が正しくありません";
  }

  if (!data.password) {
    errors.password = "パスワードを入力してください";
  } else if (characterCount(data.password) < SIGNUP_LIMITS.passwordMin) {
    errors.password = `パスワードは${SIGNUP_LIMITS.passwordMin}文字以上で入力してください`;
  } else if (characterCount(data.password) > SIGNUP_LIMITS.passwordMax) {
    errors.password = `パスワードは${SIGNUP_LIMITS.passwordMax}文字以内で入力してください`;
  }

  if (!data.passwordConfirmation) {
    errors.passwordConfirmation = "確認用パスワードを入力してください";
  } else if (data.password !== data.passwordConfirmation) {
    errors.passwordConfirmation = "パスワードが一致しません";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, data, errors };
  }

  return { success: true, data };
};
