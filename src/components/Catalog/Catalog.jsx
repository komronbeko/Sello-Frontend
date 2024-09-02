/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "./Catalog.scss";
import { fetchBrands } from "../../features/BrandsSlice";
import { URL_IMAGE } from "../../constants/api";

const Catalog = ({ setCatalogModal, catalogs }) => {
  const categories = useSelector((state) => state.category.categories);
  const brands = useSelector((state) => state.brand.brands);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBrands());
  }, []);

  const [useCatalog, setUseCatalog] = useState(catalogs[0]);

  const navigate = useNavigate();

  function getCategories(catalog) {
    setUseCatalog(catalog);
  }

  function onclickCatalog(name) {
    navigate(`/catalog/${name}`);
    setCatalogModal(false);
  }
  function onclickCategory(subcategory) {
    const findCategory = categories.find((el) => el.name == subcategory);
    navigate(`/catalog/${findCategory?.catalog?.name}/${subcategory}`);
    setCatalogModal(false);
  }

  return (
    <div id="dropdown-window">
      <ul className="catalogs">
        {catalogs?.map((c) => {
          return (
            <li
              onClick={() => onclickCatalog(c.name)}
              onMouseEnter={() => getCategories(c)}
              key={c.id}
              className={`sidebar-item ${
                useCatalog?.name === c.name ? "active" : ""
              }`}
            >
              <button>{c.name}</button>
              <KeyboardArrowRightIcon />
            </li>
          );
        })}
        {catalogs?.map((c) => {
          return (
            <li
              onClick={() => onclickCatalog(c.name)}
              onMouseEnter={() => getCategories(c)}
              key={c.id}
              className={`sidebar-item ${
                useCatalog?.name === c.name ? "active" : ""
              }`}
            >
              <button>{c.name}</button>
              <KeyboardArrowRightIcon />
            </li>
          );
        })}
        {catalogs?.map((c) => {
          return (
            <li
              onClick={() => onclickCatalog(c.name)}
              onMouseEnter={() => getCategories(c)}
              key={c.id}
              className={`sidebar-item ${
                useCatalog?.name === c.name ? "active" : ""
              }`}
            >
              <button>{c.name}</button>
              <KeyboardArrowRightIcon />
            </li>
          );
        })}
      </ul>
      <ul className="categories">
        <div className="categories-heading">
          <h4>{useCatalog?.name}</h4>
          <p>
            There are <span>{useCatalog?.products?.length}</span> products in
            this section.
          </p>
        </div>
        <div className="categories-list">
          {useCatalog ? (
            useCatalog?.categories.length ? (
              useCatalog?.categories.map((c) => {
                return (
                  <>
                    <li key={c.id}>
                      <button onClick={() => onclickCategory(c.name)}>
                        {c.name}
                      </button>
                      <div className="catalogs-nested-categories">
                        {c?.nestedCategories.map((el) => (
                          <>
                            <p key={el.id}>{el.name} omon Keldim</p>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name} hayronman</p>
                            <p key={el.id}>{el.name} liberallashtirish</p>
                            <p key={el.id}>{el.name}</p>
                          </>
                        ))}
                      </div>
                    </li>{" "}
                    <li key={c.id}>
                      <button onClick={() => onclickCategory(c.name)}>
                        {c.name} helloWorld
                      </button>
                      <div className="catalogs-nested-categories">
                        {c?.nestedCategories.map((el) => (
                          <>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                          </>
                        ))}
                      </div>
                    </li>{" "}
                    <li key={c.id}>
                      <button onClick={() => onclickCategory(c.name)}>
                        {c.name}
                      </button>
                      <div className="catalogs-nested-categories">
                        {c?.nestedCategories.map((el) => (
                          <>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                          </>
                        ))}
                      </div>
                    </li>{" "}
                    <li key={c.id}>
                      <button onClick={() => onclickCategory(c.name)}>
                        {c.name} welcome to tashkent
                      </button>
                      <div className="catalogs-nested-categories">
                        {c?.nestedCategories.map((el) => (
                          <>
                            <p key={el.id}>
                              {el.name} Dovron fayziev kelib ketdi
                            </p>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                          </>
                        ))}
                      </div>
                    </li>{" "}
                    <li key={c.id}>
                      <button onClick={() => onclickCategory(c.name)}>
                        {c.name}
                      </button>
                      <div className="catalogs-nested-categories">
                        {c?.nestedCategories.map((el) => (
                          <>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                          </>
                        ))}
                      </div>
                    </li>{" "}
                    <li key={c.id}>
                      <button onClick={() => onclickCategory(c.name)}>
                        {c.name}
                      </button>
                      <div className="catalogs-nested-categories">
                        {c?.nestedCategories.map((el) => (
                          <>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                          </>
                        ))}
                      </div>
                    </li>{" "}
                    <li key={c.id}>
                      <button onClick={() => onclickCategory(c.name)}>
                        {c.name}
                      </button>
                      <div className="catalogs-nested-categories">
                        {c?.nestedCategories.map((el) => (
                          <>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                          </>
                        ))}
                      </div>
                    </li>{" "}
                    <li key={c.id}>
                      <button onClick={() => onclickCategory(c.name)}>
                        {c.name}
                      </button>
                      <div className="catalogs-nested-categories">
                        {c?.nestedCategories.map((el) => (
                          <>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                          </>
                        ))}
                      </div>
                    </li>{" "}
                    <li key={c.id}>
                      <button onClick={() => onclickCategory(c.name)}>
                        {c.name} and Staff like that
                      </button>
                      <div className="catalogs-nested-categories">
                        {c?.nestedCategories.map((el) => (
                          <>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                          </>
                        ))}
                      </div>
                    </li>{" "}
                    <li key={c.id}>
                      <button onClick={() => onclickCategory(c.name)}>
                        {c.name}
                      </button>
                      <div className="catalogs-nested-categories">
                        {c?.nestedCategories.map((el) => (
                          <>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                            <p key={el.id}>{el.name}</p>
                          </>
                        ))}
                      </div>
                    </li>
                  </>
                );
              })
            ) : (
              <h3>No categories</h3>
            )
          ) : (
            <h3>Choose catalog...</h3>
          )}
        </div>
      </ul>
      <ul className="brands">
        {brands?.map((el) => (
          <li key={el.id}>
            <img
              width={160}
              height={80}
              src={`${URL_IMAGE}/${el.photo}`}
              alt={el.name}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Catalog;
