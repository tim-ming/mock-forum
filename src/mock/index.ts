import { createServer } from 'miragejs';
import data from './data.json';
import { IPost } from 'src/types';

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

    this.get('/posts/:id', (_,request) => {
      const id = request.params.id
      const post = data.posts.find(post => post.id === id) as IPost
      return post
    });

    this.get('/posts_categories',(_,request) => {
      // Get list of all categories for filtering
      const categories = data.posts.reduce((acc:string[], post) => {
        post.categories.forEach(({id,name}) => {
          if (!acc.includes(name)) {
            acc.push(name);
          }
        });
        return acc;
      }, []);
      return categories
    })

    this.get('/posts', (_,request) => {
      // Default to 10 posts per page
      let limit = 10

      // Default to 0 offset (i.e. the first {limit} posts)
      let offset = 0

      let query = request.queryParams

      if (query){
        limit = query.limit ? parseInt(query.limit) : limit
        offset = query.offset ? parseInt(query.offset) : offset
      }

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

      // Filter by category if provided
      function filterCategory(posts: IPost[]):IPost[] {
        if (queryParams.category) {
          // Filter posts by category, inclusive
          return posts.filter((post)=>queryParams.category.some(qCategory=>post.categories.map((category)=>category.name).includes(qCategory)))
        } else{
          return posts
        }
      }

      return filterCategory(data.posts).slice(offset,offset+limit)
    });
  },
});
