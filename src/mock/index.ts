import { createServer } from 'miragejs';
import data from './data.json';

// Get list of all categories for filtering
const categories = data.posts.reduce((acc:string[], post) => {
  post.categories.forEach(({id,name}) => {
    if (!acc.includes(name)) {
      acc.push(name);
    }
  });
  return acc;
}, []);

console.log(categories)

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/posts', (_,request) => {
      console.log(request.queryParams)

      // Default to 10 posts per page
      let limit = 10

      // Default to 0 offset (i.e. the first {limit} posts)
      let offset = 0

      // Title query
      let title = ''

      // Summary query
      let summary = ''

      let query = request.queryParams
      if (query){
        limit = query.limit ? parseInt(query.limit) : limit
        offset = query.offset ? parseInt(query.offset) : offset
      }
      return {
        posts: data.posts.slice(offset, offset + limit),
        categories: categories
      }
    });
  },
});
