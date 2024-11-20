import { useRoutes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Main from "../pages/Main/Main";
import Profile from "../pages/Profile/Profile";
import Carts from "../pages/Carts/Carts";
import Favourites from "../pages/Favourites/Favourites";
import Wallet from "../pages/Wallet/Wallet";
import Orders from "../pages/Orders/Orders";
import ProductOne from "../pages/ProductOne/ProductOne";
import Checkout from "../pages/Checkout/Checkout";
import Thank from "../pages/Thank/Thank";
import FilterByCatalog from "../pages/FilterProducts/FilterByCatalog";
import FilterByCategory from "../pages/FilterProducts/FilterByCategory";
import FilterByNestedCategory from "../pages/FilterProducts/FilterByNestedCategory";
import NotFound from "../pages/NotFound/NotFound";
import MyProducts from "../pages/MyProducts/Myproducts";
// import AdminDashboard from "../pages/AdminDashboard/Main";
import DashboardMain from "../Dashboard/Main/Main";

const routes = [
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/admin-login",
    element: <Login />,
  },
  {
    path: "/admin/dashboard",
    element: <DashboardMain />,
  },
  {
    path: "/profile/:user_id",
    element: <Profile />,
  },
  {
    path: "/profile/:user_id/carts",
    element: <Carts />,
  },
  {
    path: "/profile/:user_id/favourites",
    element: <Favourites />,
  },
  {
    path: "/profile/:user_id/myproducts",
    element: <MyProducts />,
  },
  {
    path: "/profile/:user_id/orders",
    element: <Orders />,
  },
  {
    path: "/profile/:user_id/wallet",
    element: <Wallet />,
  },
  {
    path: "/product/:id",
    element: <ProductOne />,
  },
  {
    path: "/:user_id/checkout",
    element: <Checkout />,
  },
  {
    path: "/:user_id/thank",
    element: <Thank />,
  },
  {
    path: "/catalog",
    element: <FilterByCatalog />,
  },
  {
    path: "/catalog/:category",
    element: <FilterByCategory />,
  },
  {
    path: "/catalog/:category/:subcategory",
    element: <FilterByNestedCategory />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
];

const Routes = () => {
  const element = useRoutes(routes);

  return element;
};

export default Routes;
