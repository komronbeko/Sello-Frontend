import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import { sortProducts } from "../../features/ProductsSlice";
import { fetchSortProducts } from "../../features/SortProductsSlice.js";
import NoProducts from "../../components/NoProducts/NoProducts";
import { upperCase } from "../../utils/upper-case";
import ProductsWrapper from "../../components/ProductsWrapper/ProductsWrapper";
import FilterAside from "../../components/Filters/FilterAside";
import Categorizing from "../../components/Filters/Categorizing";
import Sorting from "../../components/Filters/Sorting";
import SubCategorizing from "../../components/Filters/SubCategorizing";

import "./FilterProducts.scss";


const FilterByCategory = () => {
  const [sortingValue, setSortingValue] = useState("default");


  const catalogs = useSelector(state => state.catalog.catalogs);
  const products = useSelector(state => state.sortProducts.products);

  const dispatch = useDispatch();
  const { category } = useParams();

  const foundCatalog = catalogs.find(el => el.name === category);


  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(fetchSortProducts({ value: 'default', catalog_id: foundCatalog?.id }));
  }, [dispatch, foundCatalog?.id]);

  const filterAssets = {
    catalog_id: foundCatalog?.id,
    sorting_value: sortingValue
  }

  return (
    <div className="filter-products">
      <div className="filter-head">
        <h2>{upperCase(category)}</h2>
        <p>There are <span>{products.length}</span>  products in this section</p>
      </div>
      <div className="filter-body">
        <FilterAside filterAssets={filterAssets} data={products} />
        <div className="filter-catalog">
          <div className="filter-catalog__selections">
            <Sorting setSortingValue={setSortingValue} catalog_id={foundCatalog?.id}/>
            <Categorizing category={category}/>
            <SubCategorizing foundCatalog={foundCatalog}/>
          </div>
          {products.length ? (
            <ProductsWrapper data={products} />
          ) : (
            <NoProducts />
          )}
        </div>
      </div>
    </div>
  )
}

export default FilterByCategory