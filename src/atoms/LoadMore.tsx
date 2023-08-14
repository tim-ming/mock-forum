import { FC } from 'react';
import Button from 'src/atoms/Button';

interface LoadMoreProps {
  isFetchingNextPage: boolean;
  hasNextPage?: boolean;
  handleClick: () => void;
  LoadingComponent: React.ReactNode;
  EndComponent: React.ReactNode;
}

/**
 * Load more button atom.
 */
const LoadMore: FC<LoadMoreProps> = ({
  isFetchingNextPage,
  hasNextPage,
  handleClick,
  LoadingComponent,
  EndComponent,
}) => {
  return (
    <>
      {isFetchingNextPage ? (
        LoadingComponent
      ) : (
        <div className="flex items-center flex-col justify-center w-full gap-4">
          {hasNextPage ? (
            <Button onClick={() => handleClick()} disabled={!hasNextPage}>
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
            EndComponent
          )}
        </div>
      )}
    </>
  );
};

export default LoadMore;
