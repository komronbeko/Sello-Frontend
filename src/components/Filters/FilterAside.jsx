/* eslint-disable react/prop-types */
import Price from "./Price";
import UniversalFilter from "./UniversalFilter";

const FilterAside = ({ data, filterAssets }) => {
  const distinctDiscounts = [...new Set(data.map((el) => el.discount?.rate))];
  const distinctBrands = [...new Set(data.map((el) => el.brand?.name))];
  const distinctNestedCategories = [
    ...new Set(data.map((el) => el.nested_category?.name)),
  ];

  return (
    <div className="filter-aside">
      <Price filterAssets={filterAssets} />
      {distinctBrands.length ? (
        <UniversalFilter
          data={distinctBrands}
          title="Brand"
          filterAssets={filterAssets}
        />
      ) : (
        ""
      )}
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
