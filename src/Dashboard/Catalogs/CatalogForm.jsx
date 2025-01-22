/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import { fetchCatalogs } from "../../features/CatalogsSlice";
import http from "../../service/api";

const CatalogForm = ({ dispatch }) => {
  const handleAddCatalog = async (e) => {
    e.preventDefault();
    const { catalog } = e.target.elements;
    try {
      const { data } = await http.post("/catalog", { name: catalog.value });

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
