import { Link, useLoaderData } from 'react-router-dom';
import { IPosts } from 'src/types';

function App() {
  const posts = useLoaderData() as IPosts;
  return (
    <main>
      {posts ? (
        posts.posts.map((post) => (
          <Link key={post.id} to={`/posts/${post.id}`}>
            <article>
              <p>{post.author.name}</p>
              <h1>{post.title}</h1>
            </article>
          </Link>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}

export default App;
