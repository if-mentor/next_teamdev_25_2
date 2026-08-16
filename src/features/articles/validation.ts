// バリデーションの制限値をまとめた定数オブジェクト
export const POST_LIMITS = {
  // タイトルの最小文字数
  titleMin: 1,
  // タイトルの最大文字数
  titleMax: 40,
  // 記事詳細の最小文字数
  contentMin: 10,
  // 記事詳細の最大文字数
  contentMax: 1000,
} as const; //  as constにより各値がリテラル型として扱われreadonly(変更不可)になる

// フォームから受け取る値の型定義
export type PostValues = {
  // 記事タイトル
  title: string;
  // 選択された画像ファイル、未選択の場合はnull
  image: File | null;
  // 選択されたカテコリのID（文字列として扱う）
  categoryId: string;
  // 記事詳細本文
  content: string;
};

// PostValuesのキー(プロパティ名)だけを型として取り出す("title" | "image" | "categoryId" | "content")
export type PostField = keyof PostValues;
// 各フィールドに対応するエラーメッセージの型。
export type PostFieldErrors = Partial<Record<PostField, string>>;

// バリデーション結果を表す型
// 成功時はsuccess: trueと検証済みデータを返す
// 失敗時はsuccess: falseと入力データ・エラー内容を返す
export type PostValidationResult =
  | { success: true; data: PostValues }
  | { success: false; data: PostValues; errors: PostFieldErrors };

// 文字列の文字数を数える関数
const chartacterCount = (value: string) => Array.from(value).length;
// 値が文字列であれば前後の空白を取り除いて返し、文字列でなければ空文字を返す関数
const asTrimmedString = (value: unknown) => (typeof value === "string" ? value.trim() : "");
// 値がFileのインスタンスで、ファイルサイズが0より大きければそのまま返す
// それ以外の場合はnullを返す
const asFile = (value: unknown) => (value instanceof File && value.size > 0 ? value : null);

// フォームから受け取った生の値（型が不明なunknown）をPostValues型に正規化する関数
export const normalizePostValues = (values: Partial<Record<PostField, unknown>>): PostValues => ({
  // タイトルを文字列として正規化(前後空白除去)
  title: asTrimmedString(values.title),
  // 画像をFile型として正規化(不正な値はnullに)
  image: asFile(values.image),
  // カテゴリIDを文字列として正規化
  categoryId: asTrimmedString(values.categoryId),
  // 記事詳細を文字列として正規化
  content: asTrimmedString(values.content),
});

// メインのバリデーション関数。フォームの入力値を受け取り、検証結果を返す
export const validatePostValues = (values: Partial<Record<PostField, unknown>>): PostValidationResult => {
  // 入力値を正規化
  const data = normalizePostValues(values);
  // エラーを格納するオブジェクトを初期化
  const errors: PostFieldErrors = {};

  // タイトルのバリデーション
  // タイトルが空文字または最小文字数(1文字)未満の場合必須エラーを設定
  if (!data.title || chartacterCount(data.title) < POST_LIMITS.titleMin) {
    errors.title = "タイトルを入力してください";
  } else if (chartacterCount(data.title) > POST_LIMITS.titleMax) {
    // タイトルが40文字を超える場合文字数エラーを設定
    errors.title = `タイトルは${POST_LIMITS.titleMax}文字以内で入力してください`;
  }

  // 画像のバリデーション
  if (!data.image) {
    // 画像がnull(未選択)の場合必須エラーを設定
    errors.image = "画像を選択してください";
  }

  // カテゴリのバリデーション
  if (!data.categoryId) {
    // カテゴリIDが空文字(未選択)の場合必須エラーを設定
    errors.categoryId = "カテゴリを選択してください";
  }

  // 記事詳細のバリデーション
  if (!data.content) {
    // 記事詳細が空文字の場合必須エラーを設定
    errors.content = "記事詳細を入力してください";
  } else if (chartacterCount(data.content) < POST_LIMITS.contentMin) {
    // 記事詳細が10文字未満の場合文字数不足エラーを設定
    errors.content = `記事詳細は${POST_LIMITS.contentMin}文字以上で入力してください`;
  } else if (chartacterCount(data.content) > POST_LIMITS.contentMax) {
    // 記事詳細が1000文字を超える場合文字数超過エラーを設定
    errors.content = `記事詳細は${POST_LIMITS.contentMax}文字以内で入力してください`;
  }

  // errorsオブジェクトに1つでもキーが存在する(=何かしらエラーがある)場合
  if (Object.keys(errors).length > 0) {
    // 失敗結果として正規化済みデータとエラー内容を返す
    return { success: false, data, errors };
  }

  // エラーが1つもなければ成功結果として正規化済みデータを返す
  return { success: true, data };
};
