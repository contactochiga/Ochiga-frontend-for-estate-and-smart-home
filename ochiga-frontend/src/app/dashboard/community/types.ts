export type Post = {
  id: number;
  author: string;
  content: string;
  image?: string | null;
  video?: string | null;
  likes: number;
  liked?: boolean;
  comments: { id: number; author: string; text: string }[];
  pinned?: boolean;
  createdAt?: string;
};

export type Group = {
  id: number;
  name: string;
  members: number;
  joined?: boolean;
};
