/**
 * Common header component for in Layout.
 */
const Header = ({ ...props }) => {
  return (
    <header {...props}>
      <p className="text-2xl font-medium">Mock Forum</p>
    </header>
  );
};

export default Header;
