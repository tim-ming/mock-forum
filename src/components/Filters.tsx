import { FC, useMemo } from 'react';
import { SetURLSearchParams, useSearchParams } from 'react-router-dom';

/**
 * Toggles a filter key/value pair. Auto-sorts query params to ensure cache hits on different orderings.
 * @param key key of the filter
 * @param value value of the filter
 */
function toggleFilter(
  key: string,
  value: string,
  searchParams: URLSearchParams,
  setSearchParams: SetURLSearchParams
) {
  const values = searchParams.getAll(key);
  const index = values.indexOf(value);

  // remove key, will append back later after sorting
  searchParams.delete(key);

  if (index !== -1) {
    values.splice(index, 1);
  } else {
    values.push(value);
  }

  // we sort so filter query values are always in the same order
  values.sort();

  // add back params values to key
  values.forEach((val) => searchParams.append(key, val));

  // we sort so filter query keys are always in the same order
  searchParams.sort();

  setSearchParams(searchParams);
}

const FilterButton: FC<{
  filterKey: string;
  filterValue: string;
}> = ({ filterKey, filterValue }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isActive = useMemo(
    () => searchParams.getAll(filterKey).includes(filterValue),
    [searchParams, filterKey, filterValue]
  );

  return (
    <button
      className={`flex ${
        isActive
          ? 'border-accent bg-accent-200 text-secondary'
          : 'border-transparent bg-primary/10 hover:bg-primary/20'
      } text-[0.8rem] sm:text-sm text-primary-200 px-[0.5rem] py-[0.2rem] sm:px-[0.9rem] sm:py-[0.4rem] whitespace-nowrap rounded-full border-[1px] transition-colors duration-100`}
      onClick={() =>
        toggleFilter(filterKey, filterValue, searchParams, setSearchParams)
      }
    >
      {filterValue}
    </button>
  );
};

export const Filter: FC<{ filtersKey: string; filters: string[] }> = ({
  filtersKey,
  filters,
}) => {
  return (
    <div className="flex gap-[0.3rem] sm:gap-2 flex-wrap">
      {filters.map((filterValue, key) => (
        <FilterButton
          key={key}
          filterKey={filtersKey}
          filterValue={filterValue}
        />
      ))}
    </div>
  );
};
