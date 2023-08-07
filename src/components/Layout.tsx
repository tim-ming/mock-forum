import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <div className="mx-auto max-w-[60rem] pt-8 pb-20">
        <Outlet />
      </div>
    </>
  );
};
