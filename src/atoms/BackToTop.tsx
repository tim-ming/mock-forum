import { useState, useEffect } from 'react';

/**
 * Hook to check if the user has scrolled past the height of the screen.
 * @returns true if the user has scrolled past the height of the screen
 */
const useVisibleScreenHeight = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsVisible(scrollTop > window.screen.height);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return isVisible;
};

/**
 * Back to top atom. Scrolls to top of page when clicked.
 */
const BackToTop = () => {
  const visible = useVisibleScreenHeight();

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={`fixed bottom-6 right-6 bg-secondary/50 p-3 shadow-lg rounded-full ${
        visible ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-500`}
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
};

export default BackToTop;
