/* eslint-disable react/prop-types */
import { Skeleton } from "@mui/material";
// import React from "react";
import { URL_IMAGE } from "../../constants/api";
import SearchIcon from "@mui/icons-material/Search";
import noImagePng from "../../assets/no-image-icon-6.png";

import "./SearchResults.scss";

export const SearchResults = ({
  searchedProducts,
  loading,
  handleSearchRouting,
  searchInputRef,
}) => {
  return (
    <div className="search">
      {loading ? (
        <div className="search-skeletons">
          <div className="skeleton-1">
            <div className="skeleton-left">
              <Skeleton variant="rounded" height={50} width={60} />
              <Skeleton variant="rounded" height={50} width="100%" />
            </div>
            <Skeleton variant="rounded" height={50} width={60} />
          </div>
          <div className="skeleton-1">
            <div className="skeleton-left">
              <Skeleton variant="rounded" height={50} width={60} />
              <Skeleton variant="rounded" height={50} width="100%" />
            </div>
            <Skeleton variant="rounded" height={50} width={60} />
          </div>
        </div>
      ) : searchedProducts?.length ? (
        <div className="search-results">
          <ul>
            {searchedProducts.map((el) => (
              <li onClick={() => handleSearchRouting(el.id)} key={el.id}>
                <div className="left">
                  <SearchIcon
                    fontSize="medium"
                    style={{ color: "#898787d2" }}
                  />
                  <p>{el.name}</p>
                </div>
                <img
                  src={
                    el.photo ? `${URL_IMAGE}/${el.photos[0]?.path}` : noImagePng
                  }
                  alt="product-img"
                />
              </li>
            ))}
          </ul>
        </div>
      ) : searchInputRef.current?.value ? (
        <div className="no-search-results">
          <p>No results found</p>
        </div>
      ) : null}
    </div>
  );
};
