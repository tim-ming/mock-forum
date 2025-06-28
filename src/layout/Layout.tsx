import { Outlet, ScrollRestoration } from 'react-router-dom';
import Header from './Header';
import IndexWrapper from 'src/components/IndexWrapper';

/**
 * Layout component
 */
export const Layout = () => {
  return (
    <>
      <div className="shadow-md">
        <IndexWrapper>
          <Header />
        </IndexWrapper>
      </div>
      <main>
        <ScrollRestoration />
        <Outlet />
      </main>
    </>
  );
};
