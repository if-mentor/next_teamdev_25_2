import assert from "node:assert/strict";
import test from "node:test";
import { normalizeSignupValues, validateSignupValues } from "./validation.ts";

const validValues = {
  name: "山田太郎",
  email: "taro@example.com",
  password: "password123",
  passwordConfirmation: "password123",
};

test("前後の空白を取り除いて有効な入力を返す", () => {
  const result = validateSignupValues({
    name: "  山田太郎  ",
    email: "  taro@example.com  ",
    password: "  password123  ",
    passwordConfirmation: "  password123  ",
  });

  assert.equal(result.success, true);
  assert.deepEqual(result.data, validValues);
});

test("空の入力に必須エラーを返す", () => {
  const result = validateSignupValues({});

  assert.equal(result.success, false);
  if (result.success) return;
  assert.deepEqual(result.errors, {
    name: "名前を入力してください",
    email: "メールアドレスを入力してください",
    password: "パスワードを入力してください",
    passwordConfirmation: "確認用パスワードを入力してください",
  });
});

test("名前・メールアドレス・パスワードの形式を検証する", () => {
  const result = validateSignupValues({
    name: "あいうえおかきくけこさしす",
    email: "invalid-email",
    password: "1234567",
    passwordConfirmation: "different",
  });

  assert.equal(result.success, false);
  if (result.success) return;
  assert.equal(result.errors.name, "名前は12文字以内で入力してください");
  assert.equal(result.errors.email, "メールアドレスの形式が正しくありません");
  assert.equal(result.errors.password, "パスワードは8文字以上で入力してください");
  assert.equal(result.errors.passwordConfirmation, "パスワードが一致しません");
});

test("パスワードの最大文字数を検証する", () => {
  const password = "a".repeat(25);
  const result = validateSignupValues({ ...validValues, password, passwordConfirmation: password });

  assert.equal(result.success, false);
  if (result.success) return;
  assert.equal(result.errors.password, "パスワードは24文字以内で入力してください");
});

test("文字数はサロゲートペアを1文字として数える", () => {
  const result = validateSignupValues({ ...validValues, name: "😀".repeat(12) });
  assert.equal(result.success, true);
});

test("文字列以外の値を空文字に正規化する", () => {
  assert.deepEqual(normalizeSignupValues({ name: 123, email: null }), {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
});
