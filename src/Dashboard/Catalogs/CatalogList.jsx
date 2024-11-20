/* eslint-disable react/prop-types */
// import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../constants/api";
import { fetchCatalogs } from "../../features/CatalogsSlice";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";

const CatalogList = ({ catalogs, dispatch }) => {
  const token = getAccessTokenFromLocalStorage();

  const handleDelete = async (id, type) => {
    try {
      const { data } = await axios.delete(`${API_BASE_URL}/${type}/${id}`, {
        headers: { Authorization: "Bearer " + token },
      });

      toast(data.message, { type: "success" });
      dispatch(fetchCatalogs());
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  return (
    <div className="catalog-list">
      <ol>
        {catalogs.map((catalog) => (
          <li key={catalog.id}>
            <h4>{catalog.name}</h4>
            <button onClick={() => handleDelete(catalog.id, "catalog")}>
              Delete
            </button>
            <ol>
              {catalog.categories.map((category) => (
                <li key={category.id}>
                  <h5>{category.name}</h5>
                  <button onClick={() => handleDelete(category.id, "category")}>
                    Delete
                  </button>
                  {category.nestedCategories.map((nest_cat) => (
                    <p key={nest_cat.id}>
                      {nest_cat.name}
                      <button
                        onClick={() =>
                          handleDelete(nest_cat.id, "nested-category")
                        }
                      >
                        Delete
                      </button>
                    </p>
                  ))}
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default CatalogList;
