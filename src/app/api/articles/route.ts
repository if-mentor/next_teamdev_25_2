import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from("posts")
    .select("id, title, users(name), categories(name), image_path, content, created_at")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return NextResponse.json(posts);
}
