// Placeholder types for admin user management
// These will be replaced by generated types once GraphQL codegen works

export interface AdminUser {
  id: string;
  handle_name: string;
  name: string;
  name_kana?: string;
  email: string;
  phone_number?: string;
  address?: string;
  introduction?: string;
  birthday?: string;
  role: 'USER' | 'ADMIN' | 'MODERATOR';
  created_at: string;
  updated_at: string;
}

export interface AdminUsersListResponse {
  users: AdminUser[];
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface AdminUserDetail extends AdminUser {
  user_files?: {
    purpose_id: string;
    file_path: string;
  }[];
  artworks?: {
    slug_id: string;
    title: string;
    created_at: string;
  }[];
  comments?: {
    body: string;
    created_at: string;
    artwork: {
      slug_id: string;
      title: string;
    };
  }[];
}

export interface UserFormData {
  handle_name: string;
  name: string;
  name_kana?: string;
  email: string;
  phone_number?: string;
  address?: string;
  introduction?: string;
  birthday?: string;
  password?: string; // Only for create
}