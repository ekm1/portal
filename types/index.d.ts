export interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  bio?: string;
  location?: string;
  website?: string;
}
