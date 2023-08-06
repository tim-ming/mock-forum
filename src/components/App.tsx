import { Link, useLoaderData } from 'react-router-dom';
import { IPosts } from 'src/types';
import { Post } from './Post';

export default function App() {
  const posts = useLoaderData() as IPosts;
  return (
    <main className="flex px-10 flex-col md:grid gap-x-6 gap-y-4 md:gap-y-12 auto-cols-fr auto-rows-fr md:grid-cols-2">
      {posts ? (
        posts.posts.map((post) => (
          <span key={post.id} className="w-full h-full gap-y-4 flex flex-col">
            <Link
              className=" rounded-md flex w-full h-full hover:bg-secondary-200"
              to={`/posts/${post.id}`}
            >
              <Post post={post} />
            </Link>
            <hr className="md:hidden w-full h-[1px] "></hr>
          </span>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
