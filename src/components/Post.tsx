import { FC } from 'react';
import { IPost } from 'src/types';

export const Post: FC<{ post: IPost }> = ({ post }) => {
  return (
    <article className="p-4 flex flex-col justify-between gap-8">
      <div className="flex flex-col gap-4">
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
              className="px-3 py-1 rounded-full bg-gray-100"
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
