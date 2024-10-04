import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
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
import { Breadcrumbs } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

const FilterByNestedCategory = () => {
  const catalogs = useSelector((state) => state.catalog.catalogs);
  const categories = useSelector((state) => state.category.categories);
  const products = useSelector((state) => state.sortProducts.products);

  const [sortingValue, setSortingValue] = useState("default");
  const [filterActive, setFilterActive] = useState(false);

  const dispatch = useDispatch();
  const { category, subcategory } = useParams();

  const foundCatalog = catalogs.find((el) => el.name === category);
  const foundCategory = categories.find((el) => el.name === subcategory);

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(fetchCategories());
    dispatch(
      fetchSortProducts({
        value: "default",
        catalog_id: foundCatalog?.id,
        category_id: foundCategory?.id,
      })
    );
  }, [dispatch, foundCatalog?.id, foundCategory?.id]);

  const filterAssets = {
    category_id: foundCategory?.id,
    catalog_id: foundCatalog?.id,
    sorting_value: sortingValue,
  };

  return (
    <div className="filter-products">
      <div className="filter-head">
        <div className="breadcrumb">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" to={"/"}>
              Main
            </Link>
            <Link to={`/catalog/${foundCatalog?.name}`}>Catalogs</Link>
            <Link className="current">Categories</Link>
          </Breadcrumbs>
        </div>
        <h2>{upperCase(subcategory)}</h2>
        <p>
          There are <span>{products.length}</span> products in this section
        </p>
        <div className="filter-sub-categories">
          {categories.map((el) => (
            <Link to={`/catalog/${foundCatalog?.name}/${el.name}`} key={el.id}>
              {el.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="filter-body">
        <div className="filter-btn" onClick={() => setFilterActive((e) => !e)}>
          <button>
            <FilterListIcon /> <span>Filter</span>
          </button>
        </div>
        <div className={`${filterActive ? "filter-active" : null} filter-left`}>
          <div className="filter-selects responsive-on">
            <Sorting
              setSortingValue={setSortingValue}
              catalog_id={foundCatalog?.id}
            />
            <Categorizing category={category} />
            <SubCategorizing foundCatalog={foundCatalog} />
          </div>
          <FilterAside data={products} filterAssets={filterAssets} />
        </div>
        <div className="filter-catalog">
          <div className="filter-selects off">
            <Sorting
              setSortingValue={setSortingValue}
              catalog_id={foundCatalog?.id}
              category_id={foundCategory?.id}
            />
            <Categorizing category={category} />
            <SubCategorizing
              foundCatalog={foundCatalog}
              subcategory={subcategory}
            />
          </div>
          {products.length ? (
            <ProductsWrapper data={products} />
          ) : (
            <NoProducts />
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterByNestedCategory;
