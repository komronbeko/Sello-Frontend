/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import axios from "axios";
import { API_BASE_URL } from "../../constants/api";
import { fetchCatalogs } from "../../features/CatalogsSlice";

const CatalogForm = ({ dispatch, token }) => {
  const handleAddCatalog = async (e) => {
    e.preventDefault();
    const { catalog } = e.target.elements;
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/catalog/`,
        { name: catalog.value },
        { headers: { Authorization: "Bearer " + token } }
      );

      toast(data.message, { type: "success" });
      dispatch(fetchCatalogs());
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  return (
    <form onSubmit={handleAddCatalog} className="catalog__form">
      <h3>Add Catalog</h3>
      <input placeholder="Type Catalog..." type="text" name="catalog" />
      <button className="btn">Add</button>
    </form>
  );
};

export default CatalogForm;
