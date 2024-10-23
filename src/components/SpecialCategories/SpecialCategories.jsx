import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./SpecialCategories.scss";
import { fetchCategories } from "../../features/CategoriesSLice";
import { Skeleton } from "@mui/material";
// import { toast } from "react-toastify";

const SpecialCategories = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
    // if (error) {
    //   toast(error, { type: "error" });
    // }
  }, []);

  const displayPopularCategories = () => {
    if (loading || !categories.length) {
      return (
        <div className="spec-categories__skeleton">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => (
            <Skeleton key={el.id} variant="rounded" />
          ))}
        </div>
      );
    }

    const sortedCategories = categories
      .slice(0, 10)
      .sort((a, b) => b.products.length - a.products.length);

    return (
      <ul className="spec-categories__container">
        {sortedCategories.map((category) => (
          <Link
            key={category.id}
            className="link-btn"
            to={`/catalog/${category.catalog.name}/${category.name}`}
          >
            <li>
              <span>{category.name}</span>{" "}
            </li>
          </Link>
        ))}
      </ul>
    );
  };

  return (
    <section className="spec-categories">
      <p className="spec-categories__heading">
        We have selected for you the most popular categories on Sello
      </p>
      {displayPopularCategories()}
    </section>
  );
};

export default SpecialCategories;
