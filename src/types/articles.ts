export type Post = {
  id: number;
  title: string;
  users: { name: string };
  categories: { name: string };
  image_path: string;
  content: string;
  created_at: string;
};
