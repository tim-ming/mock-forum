import { Outlet, ScrollRestoration } from 'react-router-dom';
import Header from './Header';

export const Layout = () => {
  return (
    <>
      <div className=" shadow-md">
        <Header className="mx-auto max-w-[60rem] px-4 sm:px-10 py-6" />
      </div>
      <main>
        <ScrollRestoration />
        <Outlet />
      </main>
    </>
  );
};
