import { HTMLAttributes } from 'react';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  label?: string;
  disabled?: boolean | undefined;
  isLoading?: boolean;
}

export const Button = ({
  children,
  disabled,
  isLoading,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded-full flex items-center justify-center ${
        !disabled ? 'bg-accent hover:bg-accent-200' : 'bg-accent/40'
      } text-secondary transition-colors`}
      {...props}
    >
      {children}
    </button>
  );
};
