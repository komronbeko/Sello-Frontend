import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CategoryForm from "./CategoryForm";
import NestedCategoryForm from "./NestedCategoryForm";
import CatalogForm from "./CatalogForm";
import Results from "./Results";

import "./Catalogs.scss";

const Catalogs = () => {
  const { catalogs } = useSelector((state) => state.catalog);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (catalogs.length) {
      setCategories(catalogs[0].categories || []);
    }
  }, [catalogs]);

  return (
    <div id="catalogs">
      <div className="form__container">
        <CatalogForm dispatch={dispatch} />
        <CategoryForm dispatch={dispatch} catalogs={catalogs} />
        <NestedCategoryForm
          dispatch={dispatch}
          catalogs={catalogs}
          categories={categories}
        />
      </div>

      <Results catalogs={catalogs} dispatch={dispatch} />
    </div>
  );
};

export default Catalogs;
