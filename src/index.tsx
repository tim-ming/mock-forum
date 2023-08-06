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

import { PostDetailed } from './components/PostDetailed';
import { IPost } from './types';
import { Layout } from './components/Layout';
// Configure nested routes with JSX

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route
          path="/"
          loader={async ({ params, request }) => {
            // loaders can be async functions
            const res = await fetch(`/api/posts`, {
              signal: request.signal,
            });
            const data = await res.json();
            return data;
          }}
          element={<App />}
        ></Route>
        <Route
          path="/posts/:id"
          element={<PostDetailed />}
          loader={async ({ params, request }) => {
            // loaders can be async functions
            const res = await fetch(`/api/posts/${params.id}`, {
              signal: request.signal,
            });
            const data = (await res.json()) as IPost;
            return data;
          }}
        />
      </Route>
    </>
  )
);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>,
  document.getElementById('root')
);
