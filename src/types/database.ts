export type UserRole = "admin" | "writer";

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface DisciplineRecord {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface SubjectRecord {
  id: string;
  discipline_id: string;
  name: string;
  slug: string;
  description: string | null;
  order_index: number;
  created_at: string;
}

export interface TopicRecord {
  id: string;
  subject_id: string;
  name: string;
  slug: string;
  description: string | null;
  order_index: number;
  created_at: string;
}

export interface MaterialRecord {
  id: string;
  topic_id: string;
  current_revision_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface MaterialRevisionRecord {
  id: string;
  material_id: string;
  author_id: string;
  revision_number: number;
  content_markdown: string;
  change_summary: string;
  created_at: string;
}

export interface MaterialRevisionWithAuthor extends MaterialRevisionRecord {
  author: Pick<UserProfile, "id" | "full_name" | "avatar_url" | "role">;
}

export interface TopicWithMaterial extends TopicRecord {
  material: MaterialRecord & {
    current_revision: MaterialRevisionRecord | null;
  };
}
