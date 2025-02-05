import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSortProducts } from "../../features/SortProductsSlice.js";
import { upperCase } from "../../utils/upper-case";
import ProductsWrapper from "../../components/ProductsWrapper/ProductsWrapper";
import FilterAside from "../../components/Filters/FilterAside";
import Categorizing from "../../components/Filters/Categorizing";
import Sorting from "../../components/Filters/Sorting";
import SubCategorizing from "../../components/Filters/SubCategorizing";

import "./FilterProducts.scss";
import { Breadcrumbs } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

const FilterByCategory = () => {
  const [sortingValue, setSortingValue] = useState("default");
  const [filterActive, setFilterActive] = useState(false);

  const catalogs = useSelector((state) => state.catalog.catalogs);
  const { products, loading } = useSelector((state) => state.sortProducts);

  const dispatch = useDispatch();
  const { category } = useParams();

  const foundCatalog = catalogs.find((el) => el.name === category);

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(
      fetchSortProducts({ value: "default", catalog_id: foundCatalog?.id })
    );
  }, [dispatch, foundCatalog?.id]);

  const filterAssets = {
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
            <Link className="current">Catalogs</Link>
          </Breadcrumbs>
        </div>
        <h2>{upperCase(category)}</h2>
        <p>
          There are <span>{products.length}</span> products in this section
        </p>
        <div className="filter-sub-categories">
          {catalogs.map((el) => (
            <Link to={`/catalog/${el.name}`} key={el.id}>
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
            <Categorizing />
            <SubCategorizing foundCatalog={foundCatalog} />
          </div>
          <FilterAside filterAssets={filterAssets} data={products} />
        </div>
        <div className="filter-catalog">
          <div className="filter-selects off">
            <Sorting
              setSortingValue={setSortingValue}
              catalog_id={foundCatalog?.id}
            />
            <Categorizing category={category} />
            <SubCategorizing foundCatalog={foundCatalog} />
          </div>
          <ProductsWrapper data={products} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default FilterByCategory;
