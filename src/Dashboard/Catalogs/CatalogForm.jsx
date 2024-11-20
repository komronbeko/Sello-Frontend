/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { API_BASE_URL } from "../../constants/api";
import { fetchCatalogs } from "../../features/CatalogsSlice";

const CatalogForm = ({ dispatch, token }) => {
  const [catalogName, setCatalogName] = useState("");

  const handleAddCatalog = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/catalog/`,
        { name: catalogName },
        { headers: { Authorization: "Bearer " + token } }
      );

      toast(data.message, { type: "success" });
      dispatch(fetchCatalogs());
      setCatalogName("");
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  return (
    <form onSubmit={handleAddCatalog}>
      <label>Add Catalog</label>
      <input
        type="text"
        value={catalogName}
        onChange={(e) => setCatalogName(e.target.value)}
        placeholder="Type Catalog..."
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default CatalogForm;
