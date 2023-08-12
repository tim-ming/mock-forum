// Hook to get query data
import { useInfiniteQuery } from '@tanstack/react-query';

// Link component and search params hook (to get post ID)
import { useSearchParams, Link } from 'react-router-dom';

// Include LoadingSpinner component
import LoadingSpinner from './LoadingSpinner';
import 'react-loading-skeleton/dist/skeleton.css';

import { Button } from './Button';
import { Post } from './Post';
import { getPosts } from './fetchers';

import SkeletonPost from './SkeletonPost';
import { motion, AnimatePresence } from 'framer-motion';
import { FC } from 'react';

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
            fetchNextPage={fetchNextPage}
          />
        </>
      )}
    </>
  );
};

interface LoadMoreProps {
  isFetchingNextPage: boolean;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
}

const LoadMore: FC<LoadMoreProps> = ({
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}) => {
  return (
    <>
      {isFetchingNextPage ? (
        <div className="flex flex-col w-full items-center justify-center gap-2">
          <LoadingSpinner />
          <p>Loading more posts...</p>
        </div>
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
              <hr className="w-full border-t-[1px] border-primary/20" />
              <p>No more posts</p>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Posts;
