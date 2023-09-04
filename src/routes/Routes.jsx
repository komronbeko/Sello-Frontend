import { useRoutes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Main from "../pages/Main/Main";
import Profile from "../pages/Profile/Profile";
import Carts from "../pages/Carts/Carts";
import Favourites from "../pages/Favourites/Favourites";
import Wallet from "../pages/Wallet/Wallet";
import Orders from "../pages/Orders/Orders";
import ProductOne from "../pages/ProductOne/ProductOne";
import Checkout from "../pages/Checkout/Checkout";
import Thank from "../pages/Thank/Thank";

const routes = [
    {
        path: '/main',
        element: <Main/> 
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/profile/:id',
        element: <Profile/>
    },
    {
        path: '/profile/:id/carts',
        element: <Carts/>
    },
    {
        path: '/profile/:id/favourites',
        element: <Favourites/>
    },
    {
        path: '/profile/:id/orders',
        element: <Orders/>
    },
    {
        path: '/profile/:id/wallet',
        element: <Wallet/>
    },
    {
        path: '/product/:id',
        element: <ProductOne/>
    },
    {
        path: '/checkout',
        element: <Checkout/>
    },
    {
        path: '/thank',
        element: <Thank/>
    },
];

const Routes = () => {
  const element = useRoutes(routes);

  return element;
};

export default Routes;
