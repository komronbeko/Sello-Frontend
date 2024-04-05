import { useEffect } from "react";
import Hero from "../../components/Hero/Hero";
import Partners from "../../components/Partners/Partners";
import SpecialCategories from "../../components/SpecialCategories/SpecialCategories";

import "./Main.scss";
import { fetchProducts } from "../../features/ProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";
import { useNavigate } from "react-router";
import ProductsContainer from "../../components/ProductsContainer/ProductsContainer";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.product);
  const token = getAccessTokenFromLocalStorage();


  const discountedProducts = products?.filter(el => el.discount_id);
  const newProducts = products?.filter(el => el.new);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!token) navigate("/");

    dispatch(fetchProducts());
  }, [token]);

  return <div className="main">
    <Hero />
    <ProductsContainer data={products} heading="All Products!" loading={loading}/>
    <ProductsContainer data={newProducts} heading="New Products!" loading={loading}/>
    <ProductsContainer data={discountedProducts} heading="Hot Discounts!" loading={loading}/>
    <SpecialCategories />
    <Partners />
  </div>;
};
export default Main;
