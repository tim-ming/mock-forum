import React from 'react';
import ReactDOM from 'react-dom';

// Include mock API.
import './mock';

// Include styles.
import './styles/index.css';

// Include application component.
import App from './components/App';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { Post } from './components/Post';
import { IPost } from './types';
// Configure nested routes with JSX

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        loader={async ({ params, request }) => {
          // loaders can be async functions
          const res = await fetch(`/api/posts/${params.id}`, {
            signal: request.signal,
          });
          const data = await res.json();
          return data;
        }}
        element={<App />}
      ></Route>
      <Route
        path="/posts/:id"
        element={<Post />}
        loader={async ({ params, request }) => {
          // loaders can be async functions
          const res = await fetch(`/api/posts/${params.id}`, {
            signal: request.signal,
          });
          const data = (await res.json()) as IPost;
          return data;
        }}
      />
    </>
  )
);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>,
  document.getElementById('root')
);
