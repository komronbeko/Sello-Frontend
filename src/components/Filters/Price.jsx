/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sortProducts } from "../../features/ProductsSlice";

const Price = ({ filterAssets }) => {
    const { catalog_id, category_id, sorting_value } = filterAssets

    const dispatch = useDispatch();

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    function handlePrice(e) {
        if (e.target.name === "from" && e.target.value >= 0) {
            setFrom(+e.target.value);

            if (from > to) {
                setTo(+e.target.value);
            }
        }

        if (e.target.name === "to" && e.target.value >= 0) {
            setTo(+e.target.value);
        }
    }

    useEffect(() => {
        if (from && to) {
            console.log(from, to, catalog_id, category_id, sorting_value);
            dispatch(sortProducts({ catalog_id, category_id, value: sorting_value, from, to }))
        }
    }, [from, to, dispatch, catalog_id, category_id, sorting_value]);


    return (
        <form onChange={(e) => handlePrice(e)} className="sort">
            <h4>Price</h4>
            <div className='from-price'>
                <label htmlFor="inp-from">From</label>
                <input type="number" id='inp-from' name='from' value={from} placeholder="0 so'm" />
            </div>
            <div className='to-price'>
                <label htmlFor="inp-to">To</label>
                <input type="number" id='inp-to' name='to' value={to < from ? from : to} placeholder="30 000 000 so'm" />
            </div>
        </form>
    )
}

export default Price