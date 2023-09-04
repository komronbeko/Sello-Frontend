import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Layout from "./components/Layout";
import MyRoutes from "./routes/Routes";
import AuthModal from "./components/AuthModal/AuthModal";
import { useEffect } from "react";
import { fetchLikes } from "./features/LikesSlice";
import { fetchCarts } from "./features/CartSlice";
import { fetchProducts } from "./features/ProductsSlice";
import { fetchCategories } from "./features/CategoriesSLice";
import { fetchPartners } from "./features/PartnersSlice";
import { fetchUserOne } from "./features/UserOneSlice";
import { fetchOrders } from "./features/OrdersSlice";

function App() {
  const authModal = useSelector((state) => state.authModal.state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLikes());
    dispatch(fetchCarts());
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchPartners());
    dispatch(fetchUserOne());
    dispatch(fetchOrders());
  }, []);
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
