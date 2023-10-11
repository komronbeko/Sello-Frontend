/* eslint-disable react/prop-types */
import Price from "./Price"
import UniversalFilter from "./UniversalFilter"

const FilterAside = ({ data }) => {

    const distinctDiscounts = [...new Set(data.map(el => el.discount?.rate))];
    const distinctBrands = [...new Set(data.map(el => el.brand?.name))];
    const distinctNestedCategories = [...new Set(data.map(el => el.nested_category?.name))];

    return (
        <div className="filter-aside">
            <Price />
            {
                distinctBrands.length ?
                    <UniversalFilter data={distinctBrands} title="Brand" />
                    : null
            }
            {
                distinctNestedCategories.length ?
                    <UniversalFilter data={distinctNestedCategories} title="Category" />
                    : null
            }
            {
                distinctDiscounts.length ?
                    <UniversalFilter data={distinctDiscounts} title="Discount" />
                    : null
            }
        </div>
    )
}

export default FilterAside