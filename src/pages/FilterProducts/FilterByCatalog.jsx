import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
// import { sortProducts } from "../../features/ProductsSlice";
import { fetchSortProducts } from "../../features/SortProductsSlice.js";
import NoProducts from "../../components/NoProducts/NoProducts";
import ProductsWrapper from "../../components/ProductsWrapper/ProductsWrapper";
import Categorizing from "../../components/Filters/Categorizing";
import Sorting from "../../components/Filters/Sorting";

import "./FilterProducts.scss";

const FilterByCatalog = () => {
    window.scrollTo(0, 0);

    const products = useSelector(state => state.sortProducts.products);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSortProducts({ value: 'default' }));
    }, [dispatch]);

    return (
        <div className="filter-products">
            <p>There are {products.length} products in this section</p>
            <div className="filter-catalog">
                <div className="filter-catalog__selections">
                    <Sorting />
                    <Categorizing />
                </div>
                {products.length ? (
                    <ProductsWrapper data={products} />
                ) : (
                    <NoProducts />
                )}
            </div>
        </div>
    )
}

export default FilterByCatalog