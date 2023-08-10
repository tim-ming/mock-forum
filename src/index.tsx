import React from 'react';
import ReactDOM from 'react-dom';

// Include mock API.
import './mock';

// Include styles.
import './styles/index.css';

// Include application component.
import App from './components/App';

// Include react router for client-side and nested routing.
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useParams,
} from 'react-router-dom';

// Include Layout component.
import { Layout } from './components/Layout';

// Include PostDetailed component.
import { PostDetailed } from './components/[id]';

// Include react-query for data fetching cache.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Initialise query client.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnMount: false,
    },
  },
});

// Create routes.
const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path="/" element={<App />}></Route>
        <Route path="/:id" element={<PostDetailed />} />
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
