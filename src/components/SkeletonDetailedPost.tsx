import Skeleton from 'react-loading-skeleton';

const SkeletonDetailedPost = () => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-3xl mb-2">
          <Skeleton count={1} width={'90%'} />
          <Skeleton count={1} width={'70%'} />
        </h1>
        <div className="flex flex-col gap-2">
          <Skeleton count={1} width={150} />
          <div className="flex items-center mb-4 gap-2">
            <Skeleton circle={true} width={50} height={50} />
            <address className="text-lg">
              <Skeleton width={100} />
            </address>
          </div>

          <div className="flex gap-2 flex-wrap">
            {Array.from(Array(4)).map((_, i) => (
              <Skeleton key={i} width={120} height={18} />
            ))}
          </div>
        </div>
      </div>
      <hr className="border-t-primary/20"></hr>
      <div className="mb-6">
        {Array.from(Array(3)).map((_, i) => (
          <p key={i}>
            <Skeleton count={5} width={'100%'} />
            <Skeleton width={'80%'} />
            <br />
          </p>
        ))}
      </div>
    </div>
  );
};

export default SkeletonDetailedPost;
