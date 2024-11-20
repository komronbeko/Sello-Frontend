/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "./Catalog.scss";

const Catalog = ({ setCatalogModal, catalogs }) => {
  const [useCatalog, setUseCatalog] = useState(catalogs[0]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(0);
  }, []);

  const navigate = useNavigate();

  function getCategories(catalog) {
    setUseCatalog(catalog);
  }

  function onclickCatalog(name) {
    navigate(`/catalog/${name}`);
    setCatalogModal(false);
  }

  function onclickCategory(category, catalog) {
    navigate(`/catalog/${catalog}/${category}`);
    setCatalogModal(false);
  }

  return (
    <div id="dropdown-window">
      <div className="heading">
        <p>Catalogs & Categories</p>
      </div>
      <div className="catalogs">
        {!categories.length ? (
          <>
            {catalogs?.map((c) => {
              return (
                <li
                  onMouseEnter={() => getCategories(c)}
                  key={c.id}
                  className={`sidebar-item ${
                    useCatalog?.name === c.name ? "active" : ""
                  }`}
                >
                  <button onClick={() => onclickCatalog(c.name)}>
                    <span>{c.name}</span>
                  </button>
                  <KeyboardArrowRightIcon className="arrow-0" />
                  <KeyboardArrowRightIcon
                    onClick={() => setCategories(c.categories)}
                    className="arrow-1"
                  />
                </li>
              );
            })}
          </>
        ) : (
          <ul className="categories-res">
            {categories?.map((c) => {
              return (
                <li
                  onClick={() => onclickCategory(c.name, useCatalog?.name)}
                  key={c.id}
                >
                  <button>
                    <span>{c.name}</span>
                  </button>
                  <KeyboardArrowRightIcon />
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <ul className="categories">
        <div className="categories-heading">
          <h4>{useCatalog?.name}</h4>
          <p>
            There are <span>{useCatalog?.products?.length}</span> products in
            this section.
          </p>
        </div>
        <div className="categories-list">
          {useCatalog?.categories.length ? (
            useCatalog.categories.map((c) => {
              return (
                <li key={c.id}>
                  <button
                    onClick={() => onclickCategory(c.name, useCatalog?.name)}
                  >
                    {c.name}
                  </button>
                  <div className="catalogs-nested-categories">
                    {c?.nestedCategories.map((el) => (
                      <p key={el.id}>{el.name}</p>
                    ))}
                  </div>
                </li>
              );
            })
          ) : (
            <h4 className="no-categories-text">No Categories</h4>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Catalog;
