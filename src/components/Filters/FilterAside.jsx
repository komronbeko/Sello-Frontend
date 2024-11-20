/* eslint-disable react/prop-types */
import Price from "./Price";
import UniversalFilter from "./UniversalFilter";

const FilterAside = ({ data, filterAssets }) => {
  const distinctDiscounts = [...new Set(data.map((el) => el.discount?.rate))];
  const distinctNestedCategories = [
    ...new Set(data.map((el) => el.nested_category?.name)),
  ];

  return (
    <div className="filter-aside">
      <Price filterAssets={filterAssets} />
      {distinctNestedCategories.length ? (
        <UniversalFilter
          data={distinctNestedCategories}
          title="Category"
          filterAssets={filterAssets}
        />
      ) : (
        ""
      )}
      {distinctDiscounts.length ? (
        <UniversalFilter
          data={distinctDiscounts}
          title="Discount"
          filterAssets={filterAssets}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default FilterAside;
