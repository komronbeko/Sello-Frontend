/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { API_BASE_URL } from "../../constants/api";
import { fetchCatalogs } from "../../features/CatalogsSlice";

const CategoryForm = ({ dispatch, token, catalogs }) => {
  const [categoryName, setCategoryName] = useState("");
  const [selectedCatalog, setSelectedCatalog] = useState("");

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/category/`,
        {
          name: categoryName,
          catalog_id: selectedCatalog,
        },
        { headers: { Authorization: "Bearer " + token } }
      );

      toast(data.message, { type: "success" });
      dispatch(fetchCatalogs());
      setCategoryName("");
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  return (
    <form onSubmit={handleAddCategory}>
      <label>Add Category</label>
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Type Category..."
      />
      <select
        value={selectedCatalog}
        onChange={(e) => setSelectedCatalog(e.target.value)}
      >
        <option value="default" disabled>
          Select Catalog
        </option>
        {catalogs.map((el) => (
          <option key={el.id} value={el.id}>
            {el.name}
          </option>
        ))}
      </select>
      <button type="submit">Add</button>
    </form>
  );
};

export default CategoryForm;
