import { FC, useMemo } from 'react';
import { SetURLSearchParams, useSearchParams } from 'react-router-dom';

/**
 * Toggles a filter key/value pair.
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
          : 'border-transparent bg-shadow10 hover:bg-shadow20'
      } text-sm px-3 py-1 rounded-full border-[1px] transition-colors duration-100`}
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
    <div className="flex flex-col">
      <p>Filter by category</p>
      <div className="flex flex-wrap gap-2">
        {filters.map((filterValue, key) => (
          <FilterButton
            key={key}
            filterKey={filtersKey}
            filterValue={filterValue}
          />
        ))}
      </div>
    </div>
  );
};
