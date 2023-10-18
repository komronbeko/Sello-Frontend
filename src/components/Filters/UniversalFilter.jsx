/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { sortProducts } from "../../features/ProductsSlice";
import { useDispatch } from "react-redux";

const UniversalFilter = ({ data, title, filterAssets }) => {
    const [values, setValues] = useState([]);
    const [key, setKey] = useState("");

    const dispatch = useDispatch();

    function handleCheckBox(value, title) {
        setKey(title);
        const valueIndex = values.indexOf(value);

        if (valueIndex === -1) {
            setValues([...values, value]);
        } else {
            const newValues = [...values];
            newValues.splice(valueIndex, 1);
            setValues(newValues);
        }
    }


    useEffect(() => {
        const queries = {
            value: filterAssets?.value,
            catalog_id: filterAssets?.catalog_id,
            category_id: filterAssets?.category_id,
            universal: JSON.stringify(values)
        }

        switch (key) {
            case "Brand":
                dispatch(sortProducts({ brands: queries.universal, ...queries }));
                break;
            case "Category":
                dispatch(sortProducts({ sub_categories: queries.universal, ...queries }));
                break;
            case "Discount":
                dispatch(sortProducts({ discounts: queries.universal, ...queries }));
                break;
        }
    }, [key, dispatch, values, filterAssets?.value, filterAssets?.catalog_id, filterAssets?.category_id]);

    
    return (
        <div className="sort">
            <h4>{title}</h4>
            <ul className='sort-type'>
                {
                    data.map(el => {
                        if (el) {
                            return <li key={el.id}><input type="checkbox" checked={values.includes(el.value) ? true : false} name={el.value} onClick={() => handleCheckBox(el.value, title)} /><label>{el.value}</label></li>
                        }
                    })
                }
            </ul>
        </div>
    )
}

export default UniversalFilter