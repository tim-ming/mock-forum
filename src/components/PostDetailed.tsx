import {
  Await,
  Link,
  defer,
  useAsyncValue,
  useLoaderData,
} from 'react-router-dom';
import { FC, Suspense } from 'react';
import { IPost } from 'src/types';
import LoadingSpinner from './LoadingSpinner';

const dummyText = `Quisque pulvinar sem ut nibh congue porta. Proin ornare mollis arcu quis consectetur. Etiam urna ex, convallis ut risus vitae, cursus scelerisque metus. Duis accumsan eu erat vitae commodo. Ut non nisl elit. Suspendisse potenti. Morbi a dui vel turpis finibus facilisis sit amet eget risus. In bibendum enim et dolor mattis, a dapibus est feugiat. Suspendisse tortor quam, pharetra vitae metus non, rhoncus varius erat. Suspendisse potenti. Donec faucibus metus eget erat tristique rhoncus. Nulla hendrerit velit nisl, vitae pulvinar arcu convallis quis. Phasellus feugiat interdum leo. Praesent at lacinia tellus. Proin tempor rhoncus nisl sed iaculis.\n\nInteger condimentum aliquam dui eget fringilla. Nullam viverra tincidunt erat ut pretium. Praesent quis ultrices ante, non rutrum est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae efficitur eros, sit amet convallis dui. Duis cursus justo id mauris aliquet malesuada. Nunc vel aliquam dolor. Duis vel elit non ligula pellentesque euismod. Aenean vulputate magna eget nisi lacinia consectetur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nSed finibus molestie mi sit amet efficitur. Donec auctor metus sed neque aliquet, a auctor urna egestas. Curabitur eu dapibus metus, non tincidunt mi. Donec efficitur sodales orci non molestie. Proin quam sapien, iaculis sed viverra id, pellentesque sollicitudin lorem. Duis mollis ante ut posuere dapibus. In volutpat, purus id convallis laoreet, est tortor posuere nibh, non maximus mauris lacus id nulla. Donec a porttitor erat, non tempus augue. Suspendisse id iaculis est. Pellentesque quis semper ipsum.`;

export const PostDetailed = () => {
  const deferredData = useLoaderData() as { data: IPost };
  return (
    <main>
      <Suspense
        fallback={
          <div className="w-full h-screen flex flex-col items-center justify-center">
            <LoadingSpinner />
            Loading post...
          </div>
        }
      >
        <Await
          resolve={deferredData.data}
          errorElement={<p>Something went wrong!</p>}
        >
          <div className="max-w-[40rem] flex flex-col gap-4 mx-auto px-4 sm:px-10">
            <Link to="/" className="text-accent flex">
              <span className="flex items-center gap-1 rounded-full p-2 -translate-x-2 hover:bg-shadow10 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <p className="pr-2">Home</p>
              </span>
            </Link>
            <Content />
          </div>
        </Await>
      </Suspense>
    </main>
  );
};

const Content = () => {
  const post = useAsyncValue() as IPost;
  return (
    <article className="flex flex-col justify-between gap-8">
      <div className="flex flex-col gap-6">
        <div className="justify-between flex items-center">
          <div className="flex gap-6 flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-col gap-2">
              <time className="italic text-primary-200 text-sm pl-[2px]">
                Published on{' '}
                {new Date(post.publishDate)
                  .toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                  .replace(',', '')}
              </time>
              <div className="flex items-center gap-2">
                <img
                  className="rounded-full h-12 w-12"
                  src={post.author.avatar}
                  alt="author"
                ></img>
                <div className="flex flex-col gap-2">
                  <address className="flex gap-2">
                    <p className="font-medium">{post.author.name}</p>
                  </address>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-primary-200">
              <ul className="flex gap-2 text-xs flex-wrap">
                {post.categories.map((category) => (
                  <li
                    className="px-2 py-1 rounded-full bg-shadow10"
                    key={category.id}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <hr className="border-t-shadow20"></hr>
        <div className="flex flex-col gap-8">
          <p className="text-primary-200 leading-tight whitespace-pre-line">
            {post.summary + ' ' + dummyText}
          </p>
        </div>
      </div>
    </article>
  );
};
