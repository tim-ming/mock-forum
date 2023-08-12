import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IPost } from 'src/types';
import LoadingSpinner from './LoadingSpinner';
import SkeletonDetailedPost from './SkeletonDetailedPost';

// Text to mock a sample detailed post's content.
const dummyText = `Quisque pulvinar sem ut nibh congue porta. Proin ornare mollis arcu quis consectetur. Etiam urna ex, convallis ut risus vitae, cursus scelerisque metus. Duis accumsan eu erat vitae commodo. Ut non nisl elit. Suspendisse potenti. Morbi a dui vel turpis finibus facilisis sit amet eget risus. In bibendum enim et dolor mattis, a dapibus est feugiat. Suspendisse tortor quam, pharetra vitae metus non, rhoncus varius erat. Suspendisse potenti. Donec faucibus metus eget erat tristique rhoncus. Nulla hendrerit velit nisl, vitae pulvinar arcu convallis quis. Phasellus feugiat interdum leo. Praesent at lacinia tellus. Proin tempor rhoncus nisl sed iaculis.\n\nInteger condimentum aliquam dui eget fringilla. Nullam viverra tincidunt erat ut pretium. Praesent quis ultrices ante, non rutrum est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae efficitur eros, sit amet convallis dui. Duis cursus justo id mauris aliquet malesuada. Nunc vel aliquam dolor. Duis vel elit non ligula pellentesque euismod. Aenean vulputate magna eget nisi lacinia consectetur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nSed finibus molestie mi sit amet efficitur. Donec auctor metus sed neque aliquet, a auctor urna egestas. Curabitur eu dapibus metus, non tincidunt mi. Donec efficitur sodales orci non molestie. Proin quam sapien, iaculis sed viverra id, pellentesque sollicitudin lorem. Duis mollis ante ut posuere dapibus. In volutpat, purus id convallis laoreet, est tortor posuere nibh, non maximus mauris lacus id nulla. Donec a porttitor erat, non tempus augue. Suspendisse id iaculis est. Pellentesque quis semper ipsum.`;

export const PostDetailed = () => {
  return (
    <>
      <div className="max-w-[40rem] pt-6 pb-20 flex flex-col gap-4 mx-auto px-4 sm:px-10">
        <GoBackButton />
        <Content />
      </div>
    </>
  );
};

async function getPosts(id: string) {
  return await fetch(`/api/posts/${id}`).then((res) => {
    if (res.ok) {
      return res.json() as Promise<IPost>;
    } else {
      throw new Error('Something went wrong');
    }
  });
}

const GoBackButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  function goBack() {
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      navigate('/');
    }
  }
  return (
    <button onClick={goBack} className="text-accent flex">
      <span className="flex items-center gap-1 rounded-full p-2 -translate-x-2 hover:bg-primary/10 ">
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
    </button>
  );
};

const Content = () => {
  const params = useParams();
  const query = useQuery({
    queryKey: [`posts${params.id ? params.id : ''}`],
    queryFn: () => getPosts(params.id ? params.id : ''),
  });

  return (
    <>
      <article className="flex flex-col justify-between gap-8">
        {query.isLoading || query.data === undefined ? (
          <div className="w-full flex flex-col items-center justify-center">
            <SkeletonDetailedPost />
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-6">
              <div className="flex gap-6 flex-col justify-center">
                <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                  {query.data.title}
                </h1>
                <div className="flex flex-col gap-2">
                  <time className="italic text-primary-200 text-sm pl-[2px]">
                    Published on{' '}
                    {new Date(query.data.publishDate)
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
                      src={query.data.author.avatar}
                      alt="author"
                    ></img>
                    <div className="flex flex-col gap-2">
                      <address className="flex gap-2">
                        <p className="font-medium">{query.data.author.name}</p>
                      </address>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-primary-200">
                  <ul className="flex gap-2 text-xs flex-wrap">
                    {query.data.categories.map((category) => (
                      <li
                        className="px-2 py-1 rounded-full bg-primary/10"
                        key={category.id}
                      >
                        {category.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <hr className="border-t-primary/20"></hr>
            <div className="flex flex-col gap-8">
              <p className="text-primary-200 leading-tight whitespace-pre-line">
                {query.data.summary + ' ' + dummyText}
              </p>
            </div>
          </>
        )}
      </article>
    </>
  );
};
