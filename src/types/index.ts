export interface Blog {
  id?: string;
  title: string;
  content: string;
  createdAt?: Date;
}

export interface BlogFormData {
  topic: string;
}

export interface BlogGeneratorState {
  isLoading: boolean;
  error: string | null;
  blog: Blog | null;
} 