import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSortProducts } from "../../features/SortProductsSlice.js";
import { upperCase } from "../../utils/upper-case";
import NoProducts from "../../components/NoProducts/NoProducts";
import ProductsWrapper from "../../components/ProductsWrapper/ProductsWrapper";
import FilterAside from "../../components/Filters/FilterAside";
import Sorting from "../../components/Filters/Sorting";
import Categorizing from "../../components/Filters/Categorizing";
import SubCategorizing from "../../components/Filters/SubCategorizing";

import "./FilterProducts.scss";
import { fetchCategories } from "../../features/CategoriesSLice";


const FilterByNestedCategory = () => {
  const catalogs = useSelector(state => state.catalog.catalogs);
  const categories = useSelector(state => state.category.categories);
  const products = useSelector(state => state.sortProducts.products);

  const [sortingValue, setSortingValue] = useState("default");


  const dispatch = useDispatch();
  const { category, subcategory } = useParams();

  const foundCatalog = catalogs.find(el => el.name === category);
  const foundCategory = categories.find(el => el.name === subcategory);


  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(fetchCategories());
    dispatch(fetchSortProducts({ value: 'default', catalog_id: foundCatalog?.id, category_id: foundCategory?.id }));
  }, [dispatch, foundCatalog?.id, foundCategory?.id]);

  const filterAssets = {
    category_id: foundCategory?.id,
    catalog_id: foundCatalog?.id,
    sorting_value: sortingValue
  }



  return (
    <div className="filter-products">
      <div className="filter-head">
        <h2>{upperCase(subcategory)}</h2>
        <p>There are <span>{products.length}</span>  products in this section</p>
      </div>
      <div className="filter-body">
        <FilterAside data={products} filterAssets={filterAssets}/>
        <div className="filter-catalog">
          <div className="filter-catalog__selections">
            <Sorting setSortingValue={setSortingValue} catalog_id={foundCatalog?.id} category_id={foundCategory?.id} />
            <Categorizing category={category} />
            <SubCategorizing foundCatalog={foundCatalog} subcategory={subcategory} />
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

export default FilterByNestedCategory