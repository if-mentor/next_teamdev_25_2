import { AuthApiError } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { validateSignupValues, type SignupFieldErrors } from "@/features/signup/validation";
import { createServerSupabaseClient } from "@/libs/supabase/server";

type ErrorResponse = {
  message: string;
  fieldErrors?: SignupFieldErrors;
};

const DUPLICATE_EMAIL_CODES = new Set(["email_exists", "user_already_exists"]);

const errorResponse = (body: ErrorResponse, status: number) => NextResponse.json(body, { status });

const isDuplicateEmailError = (error: AuthApiError) =>
  DUPLICATE_EMAIL_CODES.has(error.code ?? "") || /already (?:been )?registered|already exists/i.test(error.message);

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return errorResponse({ message: "入力内容を確認してください" }, 400);
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return errorResponse({ message: "入力内容を確認してください" }, 400);
  }

  const validation = validateSignupValues(body);

  if (!validation.success) {
    return errorResponse({ message: "入力内容を確認してください", fieldErrors: validation.errors }, 400);
  }

  try {
    const supabase = createServerSupabaseClient();
    const { name, email, password } = validation.data;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) {
      if (error instanceof AuthApiError && isDuplicateEmailError(error)) {
        return errorResponse(
          {
            message: "このメールアドレスは既に登録されています",
            fieldErrors: { email: "このメールアドレスは既に登録されています" },
          },
          409,
        );
      }

      if (error instanceof AuthApiError && error.status === 429) {
        return errorResponse({ message: "時間をおいてからもう一度お試しください" }, 429);
      }

      console.error("Supabase sign-up failed", { code: error.code, status: error.status });
      return errorResponse({ message: "登録に失敗しました。時間をおいてからもう一度お試しください" }, 500);
    }

    // メール確認が有効なプロジェクトでは、既存アカウントの情報を秘匿するため
    // エラーではなく identities が空のユーザーが返る場合がある。
    if (data.user && data.user.identities?.length === 0) {
      return errorResponse(
        {
          message: "このメールアドレスは既に登録されています",
          fieldErrors: { email: "このメールアドレスは既に登録されています" },
        },
        409,
      );
    }

    if (!data.user) {
      console.error("Supabase sign-up returned no user");
      return errorResponse({ message: "登録に失敗しました。時間をおいてからもう一度お試しください" }, 500);
    }

    return NextResponse.json(
      {
        message: data.session
          ? "登録が完了しました"
          : "確認メールを送信しました。メール内のリンクから登録を完了してください",
        requiresEmailConfirmation: data.session === null,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Unexpected sign-up error", error);
    return errorResponse({ message: "登録に失敗しました。時間をおいてからもう一度お試しください" }, 500);
  }
}
