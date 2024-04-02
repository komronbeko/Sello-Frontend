import { useEffect } from "react";
import AllProducts from "../../components/AllProducts/AllProducts";
import DiscountProducts from "../../components/DiscountProducts/DiscountProducts";
import Hero from "../../components/Hero/Hero";
import NewProducts from "../../components/NewProducts/NewProducts";
import Partners from "../../components/Partners/Partners";
import SpecialCategories from "../../components/SpecialCategories/SpecialCategories";

import "./Main.scss";

const Main = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="main">
    <Hero />
    <AllProducts />
    <NewProducts />
    <DiscountProducts />
    <SpecialCategories />
    <Partners />
  </div>;
};
export default Main;
