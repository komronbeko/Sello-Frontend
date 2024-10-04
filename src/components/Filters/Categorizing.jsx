/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Categorizing = ({ category }) => {
  const catalogs = useSelector((state) => state.catalog.catalogs);

  function directToCategory(value) {
    if (value !== "category") {
      navigate(`/catalog/${value}`);
    }
  }

  const navigate = useNavigate();
  return (
    <form onChange={(e) => directToCategory(e.target.value)}>
      <select name="category" id="category">
        <option value="category">Category</option>
        {catalogs.length
          ? catalogs.map((el) => (
              <option
                key={el.id}
                value={el.name}
                selected={el.name === category ? el.name : ""}
              >
                {el.name}
              </option>
            ))
          : ""}
      </select>
    </form>
  );
};

export default Categorizing;
