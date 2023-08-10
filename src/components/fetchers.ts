import { IPost, IPosts } from "src/types";

export async function getPosts(queryParams: string, pageParam:number): Promise<IPosts> {
  return await fetch(`/api/posts?${queryParams}&cursor=${pageParam ? pageParam : 0}`).then((res) => {
    if (res.ok) {
      return res.json() as Promise<IPosts>;
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