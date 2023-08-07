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
  defer,
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
          element={<App />}
          loader={async ({ params, request }) => {
            // loaders can be async functions
            const data = fetch(`/api/posts`, {
              signal: request.signal,
            }).then((d) => {
              if (d.ok) return d.json() as Promise<IPost>;
              else throw new Response(d.statusText, { status: d.status });
            });
            return defer({ data: data });
          }}
        ></Route>
        <Route
          path="/posts/:id"
          element={<PostDetailed />}
          loader={async ({ params, request }) => {
            // loaders can be async functions
            const data = fetch(`/api/posts/${params.id}`, {
              signal: request.signal,
            }).then((d) => {
              if (d.ok) return d.json() as Promise<IPost>;
              else throw new Response(d.statusText, { status: d.status });
            });
            return defer({ data: data });
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
