/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { poundToDollar } from "../../utils/exchange.js";
import { fetchSortProducts } from "../../features/SortProductsSlice.js";

const Price = ({ filterAssets }) => {
    const { catalog_id, category_id, sorting_value } = filterAssets;

    const dispatch = useDispatch();

    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(30000000);

    function handlePrice(e) {
        const { name, value } = e.target;
        if (name === "from" && value >= 0) {
            setFrom(+value);
            if (from > to) {
                setTo(+value);
            }
        }
        if (name === "to" && value >= 0) {
            setTo(+value);
        }
    }

    useEffect(() => {
        if (from !== null && to !== null) {
            dispatch(fetchSortProducts({
                catalog_id,
                category_id,
                value: sorting_value,
                from: poundToDollar(from),
                to: poundToDollar(to)
            }));
        }
    }, [from, to, dispatch, catalog_id, category_id, sorting_value]);

    return (
        <form className="sort">
            <h4>Price</h4>
            <div className='from-price'>
                <label htmlFor="inp-from">From</label>
                <input type="number" id='inp-from' name='from' value={from} onChange={handlePrice} placeholder="0" />
            </div>
            <div className='to-price'>
                <label htmlFor="inp-to">To</label>
                <input type="number" id='inp-to' name='to' value={to < from ? from : to} onChange={handlePrice} placeholder="30,000,000" />
            </div>
        </form>
    );
}

export default Price;
