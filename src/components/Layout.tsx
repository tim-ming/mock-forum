import { Outlet, ScrollRestoration } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <main className="mx-auto max-w-[60rem] pt-8 pb-20">
        <ScrollRestoration />
        <Outlet />
      </main>
    </>
  );
};
