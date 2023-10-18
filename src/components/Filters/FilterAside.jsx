/* eslint-disable react/prop-types */
import Price from "./Price"
import UniversalFilter from "./UniversalFilter"
import { v4 as uuid } from 'uuid';

const FilterAside = ({ data, filterAssets }) => {

    // function distinctify(myData, type) {
    //     const uniqueID = uuid();

    //     const result = [];

    //     myData.map(el => {
    //         if (!result.length) {
    //             result.push({
    //                 value: el?.discount?.rate,
    //                 id: uniqueID
    //             })
    //         }
    //         result.map(obj => {
    //             if (type === "discount") {
    //                 if (el.discount?.rate && obj?.value !== el?.discount?.rate) {
    //                     result.push({
    //                         value: el?.discount?.rate,
    //                         id: uniqueID
    //                     })
    //                 }
    //             }
    //             if (type === "brand") {
    //                 if (el.brand?.name && obj?.value !== el?.brand?.name) {
    //                     result.push({
    //                         value: el?.brand?.name,
    //                         id: uniqueID
    //                     })
    //                 }
    //             }
    //             if (type === "nested_category") {
    //                 if (el.nested_category?.name && obj?.value !== el?.nested_category?.name) {
    //                     result.push({
    //                         value: el?.nested_category?.name,
    //                         id: uniqueID
    //                     })
    //                 }
    //             }
    //         })
    //     });

    //     return result;
    // }


    // const distinctDiscounts = distinctify(data, "discount");
    // const distinctBrands = distinctify(data, "brand");
    // const distinctNestedCategories = distinctify(data, "nested_category");

    // console.log("discount", distinctDiscounts);
    // console.log("brand", distinctBrands);
    // console.log("nested", distinctNestedCategories);



    const distinctDiscounts = Array.from(data.reduce((map, el) => {
        if (el.discount?.rate !== undefined) {
            map.set(el.discount.rate, { id: uuid(), value: el.discount.rate });
        }
        return map;
    }, new Map()).values());

    const distinctBrands = Array.from(data.reduce((map, el) => {
        if (el.brand?.name !== undefined) {
            map.set(el.brand.name, { id: uuid(), value: el.brand.name });
        }
        return map;
    }, new Map()).values());

    const distinctNestedCategories = Array.from(data.reduce((map, el) => {
        if (el.nested_category?.name !== undefined) {
            map.set(el.nested_category.name, { id: uuid(), value: el.nested_category.name });
        }
        return map;
    }, new Map()).values());



    return (
        <div className="filter-aside">
            <Price filterAssets={filterAssets} />
            {
                distinctBrands.length ?
                    <UniversalFilter data={distinctBrands} title="Brand" filterAssets={filterAssets}/>
                    : null
            }
            {
                distinctNestedCategories.length ?
                    <UniversalFilter data={distinctNestedCategories} title="Category" filterAssets={filterAssets}/>
                    : null
            }
            {
                distinctDiscounts.length ?
                    <UniversalFilter data={distinctDiscounts} title="Discount" filterAssets={filterAssets}/>
                    : null
            }
        </div>
    )
}

export default FilterAside