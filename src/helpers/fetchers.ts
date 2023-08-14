import { IPost, IPosts } from "src/types";

/**
 * Fetches posts.
 * @param queryParams Query parameters to filter by
 * @param cursor Cursor indicating the whereabouts to fetch (for pagination)
 * @returns A promise containing the posts.
 */
export async function getPosts(queryParams: string, cursor:number): Promise<IPosts> {
  return await fetch(`/api/posts?${queryParams}&cursor=${cursor ? cursor : 0}`).then((res) => {
    if (res.ok) {
      return res.json() as Promise<IPosts>;
    } else {
      throw new Error('Something went wrong while fetching posts');
    }
  });
}

/**
 * Fetches a single post by id.
 * @param id The id of the post to fetch
 * @returns A promise containing the post.
 */
export async function getPostId(id: string) {
  return await fetch(`/api/posts/${id}`).then((res) => {
    if (res.ok) {
      return res.json() as Promise<IPost>;
    } else {
      throw new Error('Something went wrong');
    }
  });
}

/**
 * Fetches the list of category names as a string.
 * @returns A promise containing the categories.
 */
export async function getCategories(): Promise<string[]> {
  return await fetch(`/api/posts_categories`).then((res) => {
    if (res.ok) {
      return res.json() as Promise<string[]>;
    } else {
      throw new Error('Something went wrong while fetching categories');
    }
  });
}