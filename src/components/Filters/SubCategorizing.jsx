/* eslint-disable react/prop-types */
import { useNavigate } from "react-router";

const SubCategorizing = ({ foundCatalog }) => {
  const navigate = useNavigate();
  return (
    <form
      onChange={(e) =>
        navigate(`/catalog/${foundCatalog?.name}/${e.target.value}`)
      }
    >
      <select name="category" id="category" defaultValue="subcategory">
        <option value="subcategory" disabled>
          Subcategory
        </option>
        {foundCatalog && foundCatalog?.categories.length
          ? foundCatalog?.categories.map((el) => (
              <option key={el.id} value={el.name}>
                {el.name}
              </option>
            ))
          : ""}
      </select>
    </form>
  );
};

export default SubCategorizing;
