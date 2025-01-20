import { useEffect } from "react";
import Hero from "../../components/Hero/Hero";
import Partners from "../../components/Partners/Partners";
import SpecialCategories from "../../components/SpecialCategories/SpecialCategories";

import { fetchProducts } from "../../features/ProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";
import { useNavigate } from "react-router";
import ProductsContainer from "../../components/ProductsContainer/ProductsContainer";

import "./Main.scss";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, loading, currentPage, totalPages } = useSelector(
    (state) => state.product
  );
  const token = getAccessTokenFromLocalStorage();

  useEffect(() => {
    // window.scrollTo(0, 0);

    if (!token) navigate("/");

    dispatch(fetchProducts(currentPage));
  }, [token, dispatch, navigate, currentPage]);

  return (
    <div className="main">
      <Hero />
      <ProductsContainer
        data={products}
        heading="All Products!"
        loading={loading}
        isDiscount={false}
        totalPages={totalPages}
        currentPage={currentPage}
      />
      <SpecialCategories />
      <Partners />
    </div>
  );
};
export default Main;
