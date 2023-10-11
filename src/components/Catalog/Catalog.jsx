/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router";

import "./Catalog.scss";

const Catalog = ({setCatalogModal}) => {
    const catalogs = useSelector(state => state.catalog.catalogs);

    const [useCatalog, setUseCatalog] = useState(null);

    const navigate = useNavigate();

    function getCategories(catalog) {
        setUseCatalog(catalog)
    }

    function onclickCatalog(name) {
        navigate(`/catalog/${name}`);
        setCatalogModal(false);
    }
    function onclickCategory(name) {
        navigate(`/filter/all/${name}/all/all/all`)
    }
    return (
        <div id='dropdown-window'>
            {/* <hr /> */}
            <ul className='catalogs'>
                {catalogs?.map(c => {
                    return (
                        <li onClick={() => onclickCatalog(c.name)} onMouseEnter={() => getCategories(c)} key={c.id}><button>{c.name}</button><i className="fa-solid fa-chevron-right"></i></li>
                    )

                })}
            </ul>
            <ul className='categories'>
                <h3>{useCatalog?.name}</h3>
                <div className="categories-list">
                    {
                        useCatalog ? useCatalog?.categories.length ? useCatalog?.categories.map((c) => {
                            return <li key={c.id}>
                                <button onClick={() => onclickCategory(c.name)}>{c.name}</button>
                                {
                                    c?.nestedCategories.map(el => (
                                        <p key={el.id} >{el.name}</p>
                                    ))
                                }
                            </li>
                        })
                            : <h3>No categories</h3>
                            : <h3>Choose catalog...</h3>
                    }
                </div>
            </ul>
        </div>
    )
}

export default Catalog