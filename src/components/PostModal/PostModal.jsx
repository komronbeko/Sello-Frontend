/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./PostModal.scss";
import { toast } from "react-toastify";
import axios from "axios";
import { API_BASE_URL } from "../../constants/api";
import { fetchUserProducts } from "../../features/ProductsSlice";
import InputFileUpload from "./FileUpload";

// import http from "../../service/api";

const PostModal = ({ setPostModal, token }) => {
  const catalogs = useSelector((state) => state.catalog.catalogs);

  const dispatch = useDispatch();

  // state to hold categories of chosen catalog
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState([]);

  // state to hold nested-categories of chosen category
  const [nestedCategories, setNestedCategories] = useState([]);

  // set initial states for categories and sub-categories
  useEffect(() => {
    if (catalogs.length) {
      setCategories(catalogs[0].categories);

      if (catalogs[0].categories.length) {
        setNestedCategories(catalogs[0].categories[0].nestedCategories);
      }
    }
  }, [catalogs.length]);

  // Handle posting new product
  async function postProduct(e) {
    e.preventDefault();

    try {
      // Upload files and collect paths
      const uploadedPhotoPaths = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append("photo", file);

          const { data } = await axios.post(`${API_BASE_URL}/file`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + token,
            },
          });

          return data.name; // Assume `data.name` contains the uploaded file path
        })
      );

      // Get input values from the Form
      const {
        name,
        description,
        price,
        delivery_country,
        delivery,
        refund,
        unpacked,
        catalog,
        category,
        nested_category,
      } = e.target.elements;

      // Send product data with photoPaths
      const { data } = await axios.post(
        `${API_BASE_URL}/product`,
        {
          name: name.value,
          description: description.value,
          price: Number(price.value),
          delivery_country: delivery_country.value,
          delivery: Boolean(delivery.value),
          refund: Boolean(refund.value),
          unpacked: Boolean(unpacked.value),
          catalog_id: catalog.value,
          category_id: category.value,
          nested_category_id: nested_category.value,
          photoPaths: uploadedPhotoPaths, // Use uploaded paths here
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      toast(data.message, { type: "success" });
      dispatch(fetchUserProducts(token));
      setPostModal(false);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }

  // Change Categories state on Catalog change
  function handleCatalogChange(catalog_id) {
    catalogs.map((el) => {
      if (el.id == catalog_id) {
        setCategories(el.categories);
        setNestedCategories(el.categories[0].nestedCategories);
      }
    });
  }

  // Change Neseted-Categories state on Categories change
  function handleCategoryChange(category) {
    categories.map((el) =>
      el.name === category ? setNestedCategories(el.nestedCategories) : null
    );
  }

  return (
    <div className="post-modal">
      <div className="modal">
        <div className="modal-head">
          <h2>Post Product</h2>
          <p>
            Please enter the correct details of your product! Entering the
            correct detatils helps customers to find your product more easily.
          </p>
          <div
            onClick={() => {
              setPostModal(false);
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <form className="modal-body" onSubmit={postProduct}>
          <div className="form-body">
            <div className="table input-table">
              <div className="inp-label">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" required />
              </div>

              <div className="inp-label">
                <label htmlFor="price">Price (£)</label>
                <input type="number" name="price" id="price" required />
              </div>
              <div className="inp-label">
                <label htmlFor="deliv_country">Country of Delivery</label>
                <select name="delivery_country" id="deliv_country">
                  <option value="UK">UK</option>
                  <option value="Uzbekistan">Uzbekistan</option>
                </select>
              </div>
              <div className="inp-label">
                <label htmlFor="description">Description</label>
                <textarea
                  rows={7}
                  type="text"
                  name="description"
                  id="description"
                  required
                />
              </div>
            </div>
            <div className="table input-table">
              <div className="inp-label">
                <label htmlFor="delivery">Can you deliver the product?</label>
                <div className="inputs">
                  <div className="radio-label">
                    <input
                      value={true}
                      type="radio"
                      name="delivery"
                      id="delivery"
                      defaultChecked
                    />
                    <label htmlFor="">Yes</label>
                  </div>
                  <div className="radio-label">
                    <input
                      value={false}
                      type="radio"
                      name="delivery"
                      id="delivery"
                    />
                    <label htmlFor="">No</label>
                  </div>
                </div>
              </div>
              <div className="inp-label">
                <label htmlFor="refund">Can the product be refunded?</label>
                <div className="inputs">
                  <div className="radio-label">
                    <input
                      value={true}
                      type="radio"
                      name="refund"
                      id="delivery"
                      defaultChecked
                    />
                    <label htmlFor="">Yes</label>
                  </div>
                  <div className="radio-label">
                    <input
                      value={false}
                      type="radio"
                      name="refund"
                      id="delivery"
                    />
                    <label htmlFor="">No</label>
                  </div>
                </div>
              </div>
              <div className="inp-label">
                <label htmlFor="unpacked">Is the product unpacked?</label>
                <div className="inputs">
                  <div className="radio-label">
                    <input
                      value={true}
                      type="radio"
                      name="unpacked"
                      id="unpacked"
                    />
                    <label htmlFor="">Yes</label>
                  </div>
                  <div className="radio-label">
                    <input
                      value={false}
                      type="radio"
                      name="unpacked"
                      id="unpacked"
                      defaultChecked
                    />
                    <label htmlFor="">No</label>
                  </div>
                </div>
              </div>
              <div className="inp-label">
                <label htmlFor="catalog">Select Catalog</label>
                <select
                  onChange={(e) => handleCatalogChange(e.target.value)}
                  name="catalog"
                  id="catalog"
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
              </div>
              {/* {categories.length ? ( */}
              <div className="inp-label">
                <label htmlFor="category">Select Category</label>
                <select
                  name="category"
                  id="category"
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  <option disabled selected>
                    Select Category
                  </option>
                  {categories.map((el) => (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* ) : null} */}
              {nestedCategories.length ? (
                <div className="inp-label">
                  <label htmlFor="nested_category">Sub-Category</label>
                  <select name="nested_category" id="nested_category">
                    <option disabled selected>
                      Select Sub-Category
                    </option>
                    {nestedCategories.map((el) => (
                      <option key={el.id} value={el.id}>
                        {el.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}
            </div>
          </div>
          {<InputFileUpload files={files} setFiles={setFiles} />}
          <div className="form-footer">
            <button
              type="button"
              onClick={() => {
                setPostModal(false);
              }}
            >
              Cancel
            </button>
            <button>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostModal;
