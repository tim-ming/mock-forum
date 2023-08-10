// Hook to get query data
import { useQuery } from '@tanstack/react-query';

// For typing and state hook

// Link component and search params hook (to get post ID)
import { Link, useSearchParams } from 'react-router-dom';

// Include LoadingSpinner component
import LoadingSpinner from './LoadingSpinner';

// Include Post component
import { Filter } from './Filters';
import { Post } from './Post';
import { getCategories, getPosts } from './fetchers';

export default function App() {
  return <Content />;
}

const Content = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="px-4 sm:px-10 gap-4 flex flex-col">
        <Categories />
        <hr className="border-t-[1px] border-shadow-20" />
        <Posts />
      </div>
    </div>
  );
};

const Posts = () => {
  const [queryParams] = useSearchParams();
  const posts = useQuery({
    queryKey: ['posts', queryParams.toString()],
    queryFn: () => getPosts(queryParams.toString()),
  });
  return posts.isLoading ? (
    <div className="w-full flex flex-col items-center justify-center">
      <LoadingSpinner />
      <p>Loading posts...</p>
    </div>
  ) : posts.data ? (
    <div className="flex flex-col md:grid gap-x-4 gap-y-4 md:gap-y-8 auto-cols-fr auto-rows-fr md:grid-cols-2">
      {posts.data.map((post) => (
        <span key={post.id} className="w-full h-full gap-y-4 flex flex-col">
          <Link className="flex w-full h-full shadow-sm" to={`/${post.id}`}>
            <Post post={post} />
          </Link>
          <hr className="md:hidden w-full h-[1px] "></hr>
        </span>
      ))}
    </div>
  ) : (
    <p>No posts found!</p>
  );
};

const Categories = () => {
  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });
  return categories.isLoading ? (
    <div className="w-full flex flex-col items-center justify-center">
      <LoadingSpinner />
      <p>Loading categories...</p>
    </div>
  ) : categories.data ? (
    <Filter filtersKey="category" filters={categories.data} />
  ) : (
    <p>No categories found!</p>
  );
};
