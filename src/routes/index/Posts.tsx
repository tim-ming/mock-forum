// Hook to get query data
import { useInfiniteQuery } from '@tanstack/react-query';

// Link component and search params hook (to get post ID)
import { Link, useSearchParams } from 'react-router-dom';

import { getPosts } from 'src/helpers/fetchers';
import { Post } from './Post';

import { AnimatePresence, motion } from 'framer-motion';
import SkeletonPost from 'src/skeletons/SkeletonPost';
import LoadMore from 'src/atoms/LoadMore';
import LoadingSpinner from 'src/atoms/LoadingSpinner';

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
      {!isLoading && !data ? (
        <p>No posts found!</p>
      ) : (
        <>
          <div className="flex flex-col md:grid gap-x-4 gap-y-6 md:gap-y-8 auto-cols-fr auto-rows-fr md:grid-cols-2">
            <AnimatePresence>
              {isLoading ? (
                Array.from(Array(10)).map((_, i) => (
                  <motion.span
                    initial={{ opacity: 0, translateY: 20 }}
                    key={i}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * i }}
                  >
                    <SkeletonPost />
                  </motion.span>
                ))
              ) : (
                <>
                  {data.pages.map(({ posts }) =>
                    posts.map((post) => (
                      <motion.span
                        data-testid={post.id}
                        key={post.id}
                        className="w-full h-full flex flex-col"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link className="flex w-full h-full" to={`/${post.id}`}>
                          <Post post={post} />
                        </Link>
                      </motion.span>
                    ))
                  )}
                </>
              )}
            </AnimatePresence>
          </div>
          <LoadMore
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            handleClick={fetchNextPage}
            LoadingComponent={<LoadingComponent />}
            EndComponent={<EndComponent />}
          />
        </>
      )}
    </>
  );
};

const LoadingComponent = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-2">
      <LoadingSpinner />
      <p>Loading more posts...</p>
    </div>
  );
};

const EndComponent = () => {
  return (
    <>
      <hr className="w-full border-t-[1px] border-primary/20" />
      <p>No more posts</p>
      <button
        className="text-accent gap-1 hover:border-b-[1px] border-accent flex items-center"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
      >
        Back to top
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
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    </>
  );
};

export default Posts;
