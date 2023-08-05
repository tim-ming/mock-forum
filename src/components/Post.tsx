import { useLoaderData } from 'react-router-dom';
import { IPost } from 'src/types';

export const Post = () => {
  const user = useLoaderData() as IPost;
  return <main></main>;
};
