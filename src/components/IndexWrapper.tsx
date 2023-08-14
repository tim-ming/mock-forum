import { FC } from 'react';

/**
 * Wrapper component for the content of the index page.
 */
const IndexWrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="mx-auto max-w-[60rem] px-4 sm:px-10">{children}</div>;
};

export default IndexWrapper;
