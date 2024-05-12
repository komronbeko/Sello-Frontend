import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AliceCarousel from "react-alice-carousel";
import { fetchBanners } from "../../features/BannersSlice";
import { URL_IMAGE } from "../../constants/api";

import "./Hero.scss";
import "react-alice-carousel/lib/alice-carousel.css";
import { Skeleton } from "@mui/material";
import { toast } from "react-toastify";

const Hero = () => {
  const { banners, loading, error } = useSelector((state) => state.banner);

  const dispatch = useDispatch();

  const mappedBanners = banners.length
    ? banners.map((el) => {
      return (
        <Link key={el.id} className="link" to={`/catalog/${el.catalog.name}`}>
          <img src={`${URL_IMAGE}/${el.photo}`} alt={el.name} width={100}/>
        </Link>
      );
    })
    : [];

  useEffect(() => {
    dispatch(fetchBanners());
    if (error) {
      toast(error, { type: "error" });
    }
  }, [error]);


  return (
    <div className="hero">
      {loading || !banners.length ? <div className="banner-skeleton"><Skeleton variant="rounded" width={1260} height={400} /></div> : <AliceCarousel
        mouseTracking
        items={mappedBanners}
        autoPlay
        autoPlayInterval={4000}
        infinite
      />}
    </div>
  );
};

export default Hero;
