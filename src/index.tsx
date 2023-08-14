import React from 'react';
import ReactDOM from 'react-dom';

// Include mock API.
import './mock';

// Include styles.
import './styles/index.css';

// Include routes.
import PageIndex from './routes/index/Page';
import PageId from './routes/[id]/Page';

// Include react router for client-side and nested routing.
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

// Include Layout component.
import { Layout } from './layout/Layout';

// Include react-query for data fetching cache.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Initialise query client for caching.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnMount: false,
    },
  },
});

// Create routes.
const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path="/" element={<PageIndex />}></Route>
        <Route path="/:id" element={<PageId />} />
      </Route>
    </>
  )
);

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
