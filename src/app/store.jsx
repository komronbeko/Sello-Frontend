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
import TotalReducer from "../features/TotalSlice";
import SortProductsReducer from "../features/SortProductsSlice";
import SearchReducer from "../features/SearchSlice";
import ReviewsReducer from "../features/ReviewsSlice";
import ReviewOneReducer from "../features/ReviewOneSlice";
import FooterMenuStatesReducer from "../features/FooterMenuStatesSlice.";

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
    total: TotalReducer,
    sortProducts: SortProductsReducer,
    searchProducts: SearchReducer,
    productReview:   ReviewsReducer,
    reviewOne:   ReviewOneReducer,
    footerMenuState:  FooterMenuStatesReducer
  },
  // middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(logger),
});

export default store;
