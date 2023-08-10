// Hook to get query data
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

// For typing and state hook

// Link component and search params hook (to get post ID)
import { Link, useSearchParams } from 'react-router-dom';

// Include LoadingSpinner component
import LoadingSpinner from './LoadingSpinner';

// Include Post component
import { Filter } from './Filters';
import { Post } from './Post';
import { getCategories, getPosts } from './fetchers';
import { Button } from './Button';

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
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['posts', queryParams.toString()],
      queryFn: ({ pageParam }) => getPosts(queryParams.toString(), pageParam),
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    });
  return (
    <>
      {isLoading ? (
        <div className="w-full flex flex-col items-center justify-center">
          <LoadingSpinner />
          <p>Loading posts...</p>
        </div>
      ) : !data ? (
        <p>No posts found!</p>
      ) : (
        <>
          <div className="flex flex-col md:grid gap-x-4 gap-y-4 md:gap-y-8 auto-cols-fr auto-rows-fr md:grid-cols-2">
            {data.pages.map(({ posts }) =>
              posts.map((post) => (
                <span
                  key={post.id}
                  className="w-full h-full gap-y-4 flex flex-col"
                >
                  <Link
                    className="flex w-full h-full shadow-sm"
                    to={`/${post.id}`}
                  >
                    <Post post={post} />
                  </Link>
                  <hr className="md:hidden w-full h-[1px] "></hr>
                </span>
              ))
            )}
          </div>
          {isFetchingNextPage ? (
            <>
              <div className="flex flex-col w-full items-center justify-center gap-2">
                <LoadingSpinner />
                <p>Loading more posts...</p>
              </div>
            </>
          ) : (
            <div className="flex items-center flex-col justify-center w-full gap-4">
              {hasNextPage ? (
                <Button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
                  Load more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 ml-1"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </Button>
              ) : (
                <>
                  <hr className="w-full border-t-[1px] border-shadow-20" />
                  <p>No more posts</p>
                </>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

const Categories = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });
  return isLoading ? (
    <div className="w-full flex flex-col items-center justify-center">
      <LoadingSpinner />
      <p>Loading categories...</p>
    </div>
  ) : data ? (
    <Filter filtersKey="category" filters={data} />
  ) : (
    <p>No categories found!</p>
  );
};
