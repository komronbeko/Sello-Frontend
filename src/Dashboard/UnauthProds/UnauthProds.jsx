// import React from 'react';

import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import { useEffect } from "react";
import { fetchUnauthorizedProducts } from "../../features/ProductsSlice";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";

import "./UnauthProds.scss";

const UnauthorizedProdducts = () => {
  const { unauthorized } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const token = getAccessTokenFromLocalStorage();

  useEffect(() => {
    dispatch(fetchUnauthorizedProducts(token));
  }, []);

  return (
    <div id="unauth_prods">
      <div className="heading">
        <h2>Unauthorized Products</h2>
        <p>This page shows only Products that need to be verified!</p>
      </div>
      <div className="data-body">
        {unauthorized.length
          ? unauthorized?.map((el) => (
              <Card
                key={el.id}
                image={el.photos[0]?.path}
                discount={el.discount?.rate}
                id={el.id}
                price={el.price}
                title={el.name}
                isAdmin={true}
              />
            ))
          : ""}
      </div>
    </div>
  );
};

export default UnauthorizedProdducts;
