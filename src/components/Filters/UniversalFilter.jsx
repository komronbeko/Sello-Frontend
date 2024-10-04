/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { fetchSortProducts } from "../../features/SortProductsSlice.js";

import { useDispatch } from "react-redux";

const UniversalFilter = ({ data, title, filterAssets }) => {
  const [filterValues, setFilterValues] = useState({
    brand: [],
    category: [],
    discount: [],
  });
  const [key, setKey] = useState("");

  const dispatch = useDispatch();

  function handleCheckBox(value, title) {
    setKey(title);

    setFilterValues((prevFilterValues) => ({
      ...prevFilterValues,
      [title.toLowerCase()]: prevFilterValues[title.toLowerCase()].includes(
        value
      )
        ? prevFilterValues[title.toLowerCase()].filter((val) => val !== value)
        : [...prevFilterValues[title.toLowerCase()], value],
    }));
  }

  useEffect(() => {
    const queries = {
      value: filterAssets?.value,
      catalog_id: filterAssets?.catalog_id,
      category_id: filterAssets?.category_id,
      [key.toLowerCase()]: JSON.stringify(filterValues[key.toLowerCase()]),
    };

    dispatch(fetchSortProducts(queries));
  }, [
    key,
    dispatch,
    filterValues,
    filterAssets?.value,
    filterAssets?.catalog_id,
    filterAssets?.category_id,
  ]);

  return (
    <div className="sort">
      <h4>{title}</h4>
      <ul className="sort-type">
        {data.map(
          (el) =>
            el && (
              <li key={el}>
                <input
                  type="checkbox"
                  checked={filterValues[title.toLowerCase()].includes(el)}
                  name={el}
                  onClick={() => handleCheckBox(el, title)}
                />
                <label>{el}</label>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default UniversalFilter;
