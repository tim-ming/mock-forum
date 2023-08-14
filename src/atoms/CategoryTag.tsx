import { FC, HTMLAttributes } from 'react';

interface CategoryTagProps extends HTMLAttributes<HTMLLIElement> {
  categoryName: string;
}

/**
 * Category tag atom.
 * @param categoryName name of the category
 */
const CategoryTag: FC<CategoryTagProps> = ({ categoryName, ...props }) => {
  return (
    <li {...props} className="px-2 py-1 rounded-lg bg-primary/5">
      {categoryName}
    </li>
  );
};

export default CategoryTag;
