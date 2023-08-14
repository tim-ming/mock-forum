// Hook to get query data
import { useQuery } from '@tanstack/react-query';

import Filter from './Filters';
import LoadingSpinner from 'src/atoms/LoadingSpinner';
import { getCategories } from '../helpers/fetchers';

/**
 * Categories filter component.
 */
const Categories = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });
  return isLoading ? (
    <div className="w-full flex flex-col items-center justify-center">
      <LoadingSpinner />
      <p>Loading categories...</p>
    </div>
  ) : data ? (
    <Filter filtersKey="category" filters={data} />
  ) : (
    <p>No categories found!</p>
  );
};

export default Categories;
