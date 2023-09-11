import { useSelector } from "react-redux";
// import { useEffect } from "react";
import Layout from "./components/Layout";
import MyRoutes from "./routes/Routes";
import AuthModal from "./components/AuthModal/AuthModal";
// import { fetchProducts } from "./features/ProductsSlice";
// import { fetchCategories } from "./features/CategoriesSLice";
// import { fetchPartners } from "./features/PartnersSlice";
// import { fetchUserOne } from "./features/UserOneSlice";
// import { fetchCarts } from "./features/CartSlice";
// import { fetchLikes } from "./features/LikesSlice";
// import { fetchOrders } from "./features/OrdersSlice";
// import { getAccessTokenFromLocalStorage } from "./utils/storage";

import "./App.css";

function App() {
  // const dispatch = useDispatch();
  
  const authModal = useSelector((state) => state.authModal.state);

  // const token = getAccessTokenFromLocalStorage();

  // useEffect(() => {
  //   // dispatch(fetchProducts());
  //   // dispatch(fetchCategories());
  //   // dispatch(fetchPartners());
  //   // if(token) {
  //   //   dispatch(fetchUserOne(token));
  //   //   dispatch(fetchCarts(token));
  //   //   dispatch(fetchLikes(token));
  //   //   dispatch(fetchOrders(token));
  //   // }
  // }, [dispatch, token]);

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
