import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./SpecialCategories.scss";
import { fetchCategories } from "../../features/CategoriesSLice";

const SpecialCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const displayPopularCategories = () => {
    if (!categories || categories.length === 0) {
      return <h2 className="announcement">No Categories.</h2>;
    }

    const sortedCategories = categories.slice(0, 10).sort((a, b) => b.products.length - a.products.length);

    return (
      <ul className="links">
        {sortedCategories.map((category) => (
          <Link key={category.id} className="link-btn" to={`/catalog/${category.catalog.name}/${category.name}`}>
            <li>
              {category.name}
            </li>
          </Link>
        ))}
      </ul>
    );
  };

  return (
    <section className="categories">
      <p className="categories__heading">We have selected for you the most popular categories on Sello</p>
      {displayPopularCategories()}
    </section>
  );
};

export default SpecialCategories;
