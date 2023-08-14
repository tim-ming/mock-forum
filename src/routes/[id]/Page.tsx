import PostId from './PostId';
import GoBackButton from 'src/atoms/GoBackButton';

export default function PageId() {
  return (
    <>
      <div className="max-w-[40rem] pt-6 pb-20 flex flex-col gap-4 mx-auto px-4 sm:px-10">
        <GoBackButton />
        <PostId />
      </div>
    </>
  );
}
