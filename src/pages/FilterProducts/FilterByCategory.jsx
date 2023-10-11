import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { sortProducts } from "../../features/ProductsSlice";
import NoProducts from "../../components/NoProducts/NoProducts";
import { upperCase } from "../../utils/upper-case";
import ProductsWrapper from "../../components/ProductsWrapper/ProductsWrapper";
import FilterAside from "../../components/Filters/FilterAside";
import Categorizing from "../../components/Filters/Categorizing";
import Sorting from "../../components/Filters/Sorting";
import SubCategorizing from "../../components/Filters/SubCategorizing";

import "./FilterProducts.scss";


const FilterByCategory = () => {
  const catalogs = useSelector(state => state.catalog.catalogs);
  const products = useSelector(state => state.product.products);

  const dispatch = useDispatch();
  const { category } = useParams();

  const foundCatalog = catalogs.find(el => el.name === category);


  useEffect(() => {
    dispatch(sortProducts({ value: 'default', catalog_id: foundCatalog?.id }));
  }, [dispatch, foundCatalog?.id]);

  return (
    <div className="filter-products">
      <div className="filter-head">
        <h2>{upperCase(category)}</h2>
        <p>There are <span>{products.length}</span>  products in this section</p>
      </div>
      <div className="filter-body">
        <FilterAside data={products} />
        <div className="filter-catalog">
          <div className="filter-catalog__selections">
            <Sorting catalog_id={foundCatalog?.id}/>
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