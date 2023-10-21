/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { sortProducts } from "../../features/ProductsSlice";

const Sorting = ({catalog_id, category_id, setSortingValue}) => {
    const dispatch = useDispatch();

    function handleSorting(e) {
        dispatch(sortProducts({value: e.target.value, catalog_id, category_id}));
        setSortingValue(e.target.value);
    }
    
    return (
        <form onChange={(e) => handleSorting(e)}>
            <select name="sorting" id="sorting">
                <option value="default">Sorting</option>
                <option value="a-z">Name ↑</option>
                <option value="z-a">Name ↓</option>
                <option value="discount-top">Discount ↑</option>
                <option value="discount-bottom">Discount ↓</option>
                <option value="price-top">Price ↑</option>
                <option value="price-bottom">Price ↓</option>
                <option value="update-top">Update ↑</option>
                <option value="update-bottom">Update ↓</option>
            </select>
        </form>
    )
}

export default Sorting