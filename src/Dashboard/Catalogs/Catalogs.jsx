import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../../constants/api";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";
import { fetchCatalogs } from "../../features/CatalogsSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import "./Catalogs.scss";

const Catalogs = () => {
  const { catalogs } = useSelector((state) => state.catalog);
  const token = getAccessTokenFromLocalStorage();
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (catalogs.length) {
      setCategories(catalogs[0].categories || []);
    }
  }, [catalogs]);

  async function handleAddCatalog(e) {
    e.preventDefault();

    try {
      const { catalog } = e.target.elements;

      const { data } = await axios.post(
        `${API_BASE_URL}/catalog/`,
        { name: catalog.value },
        { headers: { Authorization: "Bearer " + token } }
      );

      toast(data.message, { type: "success" });
      dispatch(fetchCatalogs());
      e.target.reset();
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }

  async function handleAddCategory(e) {
    e.preventDefault();

    try {
      const { catalog, category } = e.target.elements;

      const { data } = await axios.post(
        `${API_BASE_URL}/category/`,
        { name: category.value, catalog_id: catalog.value },
        { headers: { Authorization: "Bearer " + token } }
      );

      dispatch(fetchCatalogs());
      toast(data.message, { type: "success" });
      e.target.reset();
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }

  async function handleAddNestedCategory(e) {
    e.preventDefault();

    try {
      const { category, nested_category } = e.target.elements;

      const { data } = await axios.post(
        `${API_BASE_URL}/nested-category/`,
        { name: nested_category.value, category_id: category.value },
        { headers: { Authorization: "Bearer " + token } }
      );

      dispatch(fetchCatalogs());
      toast(data.message, { type: "success" });
      e.target.reset();
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }

  function handleCatalogChange(catalog_id) {
    const selectedCatalog = catalogs.find((el) => el.id === catalog_id);
    setCategories(selectedCatalog ? selectedCatalog.categories : []);
  }

  return (
    <div id="catalogs">
      <div className="form__container">
        <form onSubmit={handleAddCatalog} className="catalog__form">
          <h3>Add Catalog</h3>
          <input placeholder="Type Catalog..." type="text" name="catalog" />
          <button className="btn">Add</button>
        </form>

        <form onSubmit={handleAddCategory} className="category__form">
          <h3>Add Category</h3>
          <input placeholder="Type Category..." type="text" name="category" />
          <select name="catalog">
            <option value="" disabled selected>
              Select Catalog
            </option>
            {catalogs.map((el) => (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            ))}
          </select>
          <button className="btn">Add</button>
        </form>

        <form
          onSubmit={handleAddNestedCategory}
          className="nested__category__form"
        >
          <h3>Add Sub-Category</h3>
          <input
            placeholder="Type Sub-Category..."
            type="text"
            name="nested_category"
          />
          <select
            onChange={(e) => handleCatalogChange(e.target.value)}
            name="catalog"
          >
            <option value="" disabled selected>
              Select Catalog
            </option>
            {catalogs.map((el) => (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            ))}
          </select>
          <select name="category">
            <option value="" disabled selected>
              Select Category
            </option>
            {categories.map((el) => (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            ))}
          </select>
          <button className="btn">Add</button>
        </form>
      </div>

      <div className="results">
        {catalogs.map((catalog) => (
          <div key={catalog.id} className="catalog">
            <h4>{catalog.name}</h4>
            <ul className="category">
              {catalog.categories.map((category) => (
                <li key={category.id}>
                  <h5>{category.name}</h5>
                  <ul>
                    {category.nestedCategories.map((nested) => (
                      <li key={nested.id}>{nested.name}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogs;
