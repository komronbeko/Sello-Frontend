import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../features/AuthSlice";
import CatalogReducer from "../features/CatalogsSlice";
import BannerReducer from "../features/BannersSlice";
import AuthModalReducer from "../features/AuthModalSlice";
import AuthAssetsReducer from "../features/AuthAssetsSlice";
import ProductsReducer from "../features/ProductsSlice";
import LikesReducer from "../features/LikesSlice";
import CartsReducer from "../features/CartSlice";
import CategoriesReducer from "../features/CategoriesSLice";
import PartnersReducer from "../features/PartnersSlice";
import UserOneReducer from "../features/UserOneSlice";
import ProductOneReducer from "../features/ProductOneSlice";
import ProductInfoReducer from "../features/ProductInfoSlice";
import OrdersReducer from "../features/OrdersSlice";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    catalog: CatalogReducer,
    product: ProductsReducer,
    like: LikesReducer,
    cart: CartsReducer,
    order: OrdersReducer,
    category: CategoriesReducer,
    banner: BannerReducer,
    user: UserOneReducer,
    productOne: ProductOneReducer,
    partner: PartnersReducer,
    authModal: AuthModalReducer,
    authAssets: AuthAssetsReducer,
    productInfo: ProductInfoReducer,
  },
});

export default store;
