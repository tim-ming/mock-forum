import { useLoaderData } from 'react-router-dom';
import { IPost } from 'src/types';

export const PostDetailed = () => {
  const post = useLoaderData() as IPost;
  return (
    <main>
      {post ? (
        <article>
          <img className="" src={post.author.avatar} alt="author"></img>
          <p>{post.title}</p>
          <p>{post.summary}</p>
          <address className="">
            Published on {new Date(post.publishDate).toDateString()} by{' '}
            {post.author.name}
          </address>
          <ul className="flex gap-2 text-sm">
            {post.categories.map((category) => (
              <li
                className="px-2 py-1 rounded-full bg-gray-100"
                key={category.id}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </article>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};
