import { FC } from 'react';
import { IPost } from 'src/types';

export const Post: FC<{ post: IPost }> = ({ post }) => {
  return (
    <article className="p-5 flex flex-col justify-between gap-8">
      <div className="flex flex-col gap-4">
        <div className="justify-between flex items-center">
          <div className="flex gap-2 items-center">
            <img
              className="rounded-full h-10"
              src={post.author.avatar}
              alt="author"
            ></img>
            <div className="flex flex-col gap-2">
              <address className="text-sm not-italic flex gap-2">
                <p className="font-medium">{post.author.name}</p>
                <p>·</p>
                <time className="text-sm text-primary-200">
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
        <ul className="flex gap-2 text-xs md:text-sm flex-wrap">
          {post.categories.map((category) => (
            <li
              className="px-3 py-1 rounded-full bg-shadow10"
              key={category.id}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};
