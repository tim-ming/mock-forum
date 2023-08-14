import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Go back button atom. Navigates back in browser if history is present, else one route back when clicked.
 */
const GoBackButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  function goBack() {
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      navigate('/');
    }
  }
  return (
    <button onClick={goBack} className="text-accent flex">
      <span className="flex items-center gap-1 rounded-full p-2 -translate-x-2 hover:bg-primary/10 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        <p className="pr-2 font-medium">Home</p>
      </span>
    </button>
  );
};
export default GoBackButton;
