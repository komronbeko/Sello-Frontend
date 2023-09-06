import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Layout from "./components/Layout";
import MyRoutes from "./routes/Routes";
import AuthModal from "./components/AuthModal/AuthModal";
import { fetchProducts } from "./features/ProductsSlice";
import { fetchCategories } from "./features/CategoriesSLice";
import { fetchPartners } from "./features/PartnersSlice";
import { fetchUserOne } from "./features/UserOneSlice";
import { fetchCarts } from "./features/CartSlice";
import { fetchLikes } from "./features/LikesSlice";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  
  const authModal = useSelector((state) => state.authModal.state);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchPartners());
    dispatch(fetchUserOne());
    dispatch(fetchCarts());
    dispatch(fetchLikes());
  }, [dispatch]);

  return (
    <div className="App">
      {authModal ? <AuthModal /> : ""}
      <Layout>
        <MyRoutes />
      </Layout>
    </div>
  );
}

export default App;
