import usePosts from './getPosts';

function App() {
  const posts = usePosts();
  console.log(posts);
  return (
    <div>
      {posts ? (
        posts.posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
