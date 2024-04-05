import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./SpecialCategories.scss";
import { fetchCategories } from "../../features/CategoriesSLice";
import { Grid, Skeleton } from "@mui/material";
import { toast } from "react-toastify";

const SpecialCategories = () => {
  const dispatch = useDispatch();
  const {categories, loading, error} = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
    if(error){
      toast(error, { type: "error" });
    }

  }, [error]);

  const displayPopularCategories = () => {
    if (loading || !categories.length) {
      return <Grid container columnSpacing={2} rowSpacing={3} columns={5} justifyContent="center">
      {
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(el => (
          <Grid item key={el}>
            <Skeleton variant="rounded" width={241} height={90} />
          </Grid>
        ))
      }
    </Grid>;
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
