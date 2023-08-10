import { IPost } from "src/types";

export async function getPosts(queryParams: string): Promise<IPost[]> {
  return await fetch(`/api/posts?${queryParams}`).then((res) => {
    if (res.ok) {
      return res.json() as Promise<IPost[]>;
    } else {
      throw new Error('Something went wrong while fetching posts');
    }
  });
}

export async function getCategories(): Promise<string[]> {
  return await fetch(`/api/posts_categories`).then((res) => {
    if (res.ok) {
      return res.json() as Promise<string[]>;
    } else {
      throw new Error('Something went wrong while fetching categories');
    }
  });
}