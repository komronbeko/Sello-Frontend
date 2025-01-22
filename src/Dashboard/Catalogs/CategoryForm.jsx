/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
// import axios from "axios";
// import { API_BASE_URL } from "../../constants/api";
import { fetchCatalogs } from "../../features/CatalogsSlice";
import { fetchCategories } from "../../features/CategoriesSLice";
import http from "../../service/api";

const CategoryForm = ({ dispatch, catalogs }) => {
  const handleAddCategory = async (e) => {
    e.preventDefault();

    const { category, catalog } = e.target.elements;
    try {
      const { data } = await http.post("/category", {
        name: category.value,
        catalog_id: catalog.value,
      });

      toast(data.message, { type: "success" });
      dispatch(fetchCatalogs());
      dispatch(fetchCategories());
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  return (
    <form onSubmit={handleAddCategory} className="category__form">
      <h3>Add Category</h3>
      <input placeholder="Type Category..." type="text" name="category" />
      <select name="catalog">
        <option value="" disabled selected>
          Select Catalog
        </option>
        {catalogs.map((el) => (
          <option key={el.id} value={el.id} name="catalog">
            {el.name}
          </option>
        ))}
      </select>
      <button className="btn">Add</button>
    </form>
  );
};

export default CategoryForm;
