import { HTMLAttributes } from 'react';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  label?: string;
  disabled?: boolean | undefined;
  isLoading?: boolean;
}

/**
 * Simple button atom to enforce consistency.
 */
const Button = ({ children, disabled, isLoading, ...props }: ButtonProps) => {
  return (
    <button
      className={`hover:shadow-md px-4 py-2 rounded-full flex items-center justify-center ${
        !disabled ? 'bg-accent-200 hover:bg-accent' : 'bg-accent/40'
      } text-secondary transition-colors`}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
