import { createServer } from 'miragejs';
import data from './data.json';
import { IPost } from 'src/types';
import { filterCategory } from './filters';

// sort in descending order by publish date, ideally this would be done on the backend but let's not change the provided JSON
data.posts.sort((a,b) => {
  if (new Date(a.publishDate) > new Date(b.publishDate)) {
    return -1;
  } else if (new Date(a.publishDate) < new Date(b.publishDate)) {
    return 1;
  } else {
    return 0
  }
})

createServer({
  routes() {
    this.namespace = 'api';

    // route for getting a single post by id
    this.get('/posts/:id', (_,request) => {
      const id = request.params.id
      const post = data.posts.find(post => post.id === id) as IPost
      return post
    });

    // route for getting all categories
    this.get('/posts_categories',() => {
      // Get list of all categories for filtering
      const categories = data.posts.reduce((acc:string[], post) => {
        post.categories.forEach(({name}) => {
          if (!acc.includes(name)) {
            acc.push(name);
          }
        });
        return acc;
      }, []);
      return categories
    })

    // route for getting all posts
    this.get('/posts', (_,request) => {
      // Default to 10 posts per load
      const postsPerLoad = 10

      type queryObject = {
        [key:string]: string[]
      }

      // Convert query params to object
      const queryParams = Array.from(new URLSearchParams(request.url.split("?")[1])).reduce((acc, [key, value]) => {
        if (acc[key]) {
          acc[key].push(value)
        } else {
          acc[key] = [value];
        }
        return acc;
      },{} as queryObject)

      // Filter posts by categories, inclusive
      const filteredPosts = filterCategory(data.posts,queryParams.category)

      const postCount = filteredPosts.length
      const cursor = queryParams.cursor ? parseInt(queryParams.cursor[0]) : 0
      const [start, end] = (() => {
        if (postCount < postsPerLoad) {
          return [0, postsPerLoad]
        } else {
          return [cursor * postsPerLoad, (cursor + 1) * postsPerLoad];
        }
      })();

      const posts = filteredPosts.slice(start,end)

      return {
        posts,
        nextCursor: (cursor+1)*postsPerLoad < postCount ? cursor+1 : null
      }
    });
  },
});
