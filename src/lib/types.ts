export type Project = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  url: string | null;
  image_url: string | null;
  category: string | null;
  is_published: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type ContactSubmission = {
  id: string;
  name: string;
  business_name: string | null;
  email: string | null;
  phone: string | null;
  service_needed: string | null;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  created_at: string;
};

export type Review = {
  id: string;
  reviewer_name: string;
  business_or_project: string | null;
  rating: number | null;
  body: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  approved_at: string | null;
};

export type ProjectInput = {
  title: string;
  slug: string;
  description?: string;
  url?: string;
  image_url?: string;
  category?: string;
  is_published?: boolean;
  is_featured?: boolean;
  sort_order?: number;
};
