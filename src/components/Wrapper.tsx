import React from 'react';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="mx-auto max-w-[60rem] pb-20 px-4 sm:px-10">{children}</div>
  );
};

export default Wrapper;
