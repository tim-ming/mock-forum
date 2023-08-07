import { Await, Link, useAsyncValue, useLoaderData } from 'react-router-dom';
import { IPost, IPosts } from 'src/types';
import { Post } from './Post';
import { Suspense, FC, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { useSearchParams } from 'react-router-dom';

export default function App() {
  const deferredData = useLoaderData() as { data: IPosts };
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <LoadingSpinner />
          Loading posts...
        </div>
      }
    >
      <Await
        resolve={deferredData.data}
        errorElement={<p>Something went wrong!</p>}
      >
        <div className="flex flex-col gap-8">
          <Content />
        </div>
      </Await>
    </Suspense>
  );
}

const CategoryFilter: FC<{ categories: IPosts['categories'] }> = ({
  categories,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className="flex flex-col">
      <p>Filter by category</p>
      <div className="flex flex-wrap gap-2">
        {categories.map((category, key) => (
          <button
            className="flex text-sm px-3 py-1 bg-shadow10 rounded-full hover:bg-shadow20"
            key={key}
            onClick={() => setSearchParams(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

const Content = () => {
  const posts = useAsyncValue() as IPosts;
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="px-4 sm:px-10 flex flex-col">
      <CategoryFilter categories={posts.categories} />
      <main className="flex flex-col md:grid gap-x-4 gap-y-4 md:gap-y-8 auto-cols-fr auto-rows-fr md:grid-cols-2">
        {posts.posts.map((post) => (
          <span key={post.id} className="w-full h-full gap-y-4 flex flex-col">
            <Link
              className="shadow-sm rounded-md flex w-full h-full hover:bg-secondary-200"
              to={`/posts/${post.id}`}
            >
              <Post post={post} />
            </Link>
            <hr className="md:hidden w-full h-[1px] "></hr>
          </span>
        ))}
      </main>
    </div>
  );
};
