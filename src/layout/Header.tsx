/**
 * Common header component for in Layout.
 */
const Header = ({ ...props }) => {
  return (
    <header {...props}>
      <p className="text-2xl font-medium">Lizard Global Forum</p>
    </header>
  );
};

export default Header;
