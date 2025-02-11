
export interface Document {
  id: string;
  title: string;
  description: string | null;
  file_type: string;
  file_path: string;
  created_at: string;
  category: string | null;
  tags: string[] | null;
  learning_type: string | null;
  difficulty_level: string | null;
  view_count: number;
  last_viewed_at: string | null;
}
