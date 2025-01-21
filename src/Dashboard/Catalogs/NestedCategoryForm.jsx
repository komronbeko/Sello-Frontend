/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { API_BASE_URL } from "../../constants/api";
import { fetchCatalogs } from "../../features/CatalogsSlice";

const NestedCategoryForm = ({ dispatch, token, catalogs }) => {
  const [categories, setCategories] = useState([]);

  console.log(categories);

  const handleAddNestedCategory = async (e) => {
    e.preventDefault();
    const { nested_category, category, catalog } = e.target.elements;
    try {
      console.log(nested_category);

      const { data } = await axios.post(
        `${API_BASE_URL}/nested-category/`,
        {
          name: nested_category.value,
          category_id: +category.value,
          catalog_id: +catalog.value,
        },
        { headers: { Authorization: "Bearer " + token } }
      );

      toast(data.message, { type: "success" });
      dispatch(fetchCatalogs());
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  const handleCatalogChange = (catalog_id) => {
    // console.log(catalog_id);

    // setSelectedCatalog(e.target.value);
    const selected = catalogs.find((catalog) => catalog.id == catalog_id);

    setCategories(selected.categories);
  };

  return (
    <form onSubmit={handleAddNestedCategory} className="nested__category__form">
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
  );
};

export default NestedCategoryForm;
