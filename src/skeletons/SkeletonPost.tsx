import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

/**
 * Skeleton loader for post component.
 */
const SkeletonPost = () => {
  return (
    <div className="rounded shadow-sm border-primary/5 border-[1px] p-4">
      <div className="flex items-center mb-4 gap-2">
        <Skeleton circle={true} width={40} height={40} />
        <div className="flex justify-between items-center w-full">
          <div className="gap-2 flex ">
            <Skeleton width={100} />
            <Skeleton width={80} />
          </div>
          <Skeleton width={30} height={30} />
        </div>
      </div>
      <h2 className="text-2xl mb-2 w-[60%]">
        <Skeleton count={1} />
      </h2>
      <div className="mb-6">
        <Skeleton count={2} />
      </div>
      <div className="flex gap-2 flex-wrap">
        {Array.from(Array(4)).map((_, i) => (
          <Skeleton key={i} width={120} height={18} />
        ))}
      </div>
    </div>
  );
};

export default SkeletonPost;
