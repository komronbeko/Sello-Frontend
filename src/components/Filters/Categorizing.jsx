/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useNavigate } from "react-router"

const Categorizing = ({category}) => {
    const catalogs = useSelector(state => state.catalog.catalogs);

    const navigate = useNavigate();
    return (
        <form onChange={(e) => navigate(`/catalog/${e.target.value}`)}>
              <select name="category" id="category">
                <option value="category">Category</option>
                {
                  catalogs.length ? catalogs.map(el => (
                    <option key={el.id} value={el.name} selected={el.name === category ? el.name : ""} >{el.name}</option>
                  )) : ""
                }
              </select>
            </form>
    )
}

export default Categorizing