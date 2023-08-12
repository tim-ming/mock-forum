// For component param typing
import { FC } from 'react';

// Include IPost type
import { IPost } from 'src/types';

export const Post: FC<{ post: IPost }> = ({ post }) => {
  return (
    <article className="w-full shadow-sm border-shadow10 border-[1px] rounded-md hover:bg-secondary-200 p-5 flex flex-col justify-between gap-8">
      <div className="flex flex-col gap-4">
        <div className="justify-between flex items-center">
          <div className="flex gap-2 items-center whitespace-nowrap overflow-hidden">
            <img
              className="rounded-full h-10"
              src={post.author.avatar}
              alt="author"
            ></img>
            <address className="text-sm items-center overflow-hidden not-italic flex gap-2">
              <p className="font-medium break-all whitespace-nowrap overflow-hidden text-ellipsis">
                {post.author.name}
              </p>
              <p>·</p>
              <time className="text-sm text-primary-200 whitespace-nowrap overflow-hidden text-ellipsis">
                {new Date(post.publishDate)
                  .toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                  .replace(',', '')}
              </time>
            </address>
          </div>
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
            className="text-primary-200"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-bold leading-tight line-clamp-2">
            {post.title}
          </h1>
          <p className="text-primary-200 leading-tight line-clamp-2">
            {post.summary}
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        <ul className="flex gap-2 text-xs flex-wrap">
          {post.categories.map((category) => (
            <li className="px-2 py-1 rounded-lg bg-primary/5" key={category.id}>
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};
