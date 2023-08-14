import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import SkeletonPostId from 'src/skeletons/SkeletonPostId';
import { getPostId } from 'src/helpers/fetchers';
import CategoryTag from 'src/atoms/CategoryTag';

// Text to mock a sample detailed post's content.
const dummyText = `Quisque pulvinar sem ut nibh congue porta. Proin ornare mollis arcu quis consectetur. Etiam urna ex, convallis ut risus vitae, cursus scelerisque metus. Duis accumsan eu erat vitae commodo. Ut non nisl elit. Suspendisse potenti. Morbi a dui vel turpis finibus facilisis sit amet eget risus. In bibendum enim et dolor mattis, a dapibus est feugiat. Suspendisse tortor quam, pharetra vitae metus non, rhoncus varius erat. Suspendisse potenti. Donec faucibus metus eget erat tristique rhoncus. Nulla hendrerit velit nisl, vitae pulvinar arcu convallis quis. Phasellus feugiat interdum leo. Praesent at lacinia tellus. Proin tempor rhoncus nisl sed iaculis.\n\nInteger condimentum aliquam dui eget fringilla. Nullam viverra tincidunt erat ut pretium. Praesent quis ultrices ante, non rutrum est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae efficitur eros, sit amet convallis dui. Duis cursus justo id mauris aliquet malesuada. Nunc vel aliquam dolor. Duis vel elit non ligula pellentesque euismod. Aenean vulputate magna eget nisi lacinia consectetur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nSed finibus molestie mi sit amet efficitur. Donec auctor metus sed neque aliquet, a auctor urna egestas. Curabitur eu dapibus metus, non tincidunt mi. Donec efficitur sodales orci non molestie. Proin quam sapien, iaculis sed viverra id, pellentesque sollicitudin lorem. Duis mollis ante ut posuere dapibus. In volutpat, purus id convallis laoreet, est tortor posuere nibh, non maximus mauris lacus id nulla. Donec a porttitor erat, non tempus augue. Suspendisse id iaculis est. Pellentesque quis semper ipsum.`;

const PostId = () => {
  const params = useParams();
  const query = useQuery({
    queryKey: [`posts${params.id ? params.id : ''}`],
    queryFn: () => getPostId(params.id ? params.id : ''),
  });

  return (
    <>
      <article className="flex flex-col justify-between gap-8">
        {query.isLoading || query.data === undefined ? (
          <div className="w-full flex flex-col items-center justify-center">
            <SkeletonPostId />
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
                      <CategoryTag
                        key={category.id}
                        categoryName={category.name}
                      />
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
export default PostId;
