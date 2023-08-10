import { IPost } from "src/types"

// Filter by category if provided
export function filterCategory(posts: IPost[], categories?: string[]):IPost[] {
  if (categories) {
    // Filter posts by category, inclusive
    return posts.filter((post)=>categories.some(qCategory=>post.categories.map((category)=>category.name).includes(qCategory)))
  } else{
    return posts
  }
}