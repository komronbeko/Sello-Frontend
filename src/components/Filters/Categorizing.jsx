/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Categorizing = () => {
  const catalogs = useSelector((state) => state.catalog.catalogs);

  function directToCategory(value) {
    // if (value !== "category") {
    navigate(`/catalog/${value}`);
    // }
  }

  const navigate = useNavigate();
  return (
    <form onChange={(e) => directToCategory(e.target.value)}>
      <select name="category" id="category" defaultValue="category">
        <option value="category" disabled>
          Category
        </option>
        {catalogs.length
          ? catalogs.map((el) => (
              <option key={el.id} value={el.name}>
                {el.name}
              </option>
            ))
          : ""}
      </select>
    </form>
  );
};

export default Categorizing;
