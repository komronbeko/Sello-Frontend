import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./SpecialCategories.scss";

const SpecialCategories = () => {
  const categories = useSelector((state) => state.category.categories);

  return (
    <section id="categories">
      <h2>We have selected for you the most popular categories on Sello</h2>
      <ul className="links">
        {categories ? (
          categories.length ? (
            categories?.map((c) => {
              return (
                <Link key={c.id} className="link-btn">
                  {c.name}
                </Link>
              );
            })
          ) : (
            <h2 className="announcement">No Categories.</h2>
          )
        ) : (
          ""
        )}
      </ul>
    </section>
  );
};

export default SpecialCategories;
