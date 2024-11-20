/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { API_BASE_URL } from "../../constants/api";
import { fetchCatalogs } from "../../features/CatalogsSlice";

const NestedCategoryForm = ({ dispatch, token, catalogs, categories }) => {
  const [nestedCategoryName, setNestedCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCatalog, setSelectedCatalog] = useState("");

  const handleAddNestedCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/nested-category/`,
        {
          name: nestedCategoryName,
          category_id: selectedCategory,
        },
        { headers: { Authorization: "Bearer " + token } }
      );

      toast(data.message, { type: "success" });
      dispatch(fetchCatalogs());
      setNestedCategoryName("");
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  const handleCatalogChange = (e) => {
    setSelectedCatalog(e.target.value);
    const selected = catalogs.find((catalog) => catalog.id === e.target.value);
    setSelectedCategory(selected ? selected.categories[0]?.id : "");
  };

  return (
    <form onSubmit={handleAddNestedCategory}>
      <label>Add Sub-Category</label>
      <input
        type="text"
        value={nestedCategoryName}
        onChange={(e) => setNestedCategoryName(e.target.value)}
        placeholder="Type Sub-Category"
      />
      <select value={selectedCatalog} onChange={handleCatalogChange}>
        <option value="default" disabled>
          Select Catalog
        </option>
        {catalogs.map((el) => (
          <option key={el.id} value={el.id}>
            {el.name}
          </option>
        ))}
      </select>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="default" disabled>
          Select Category
        </option>
        {categories.map((el) => (
          <option key={el.id} value={el.id}>
            {el.name}
          </option>
        ))}
      </select>
      <button type="submit">Add</button>
    </form>
  );
};

export default NestedCategoryForm;
