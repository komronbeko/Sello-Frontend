import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AliceCarousel from "react-alice-carousel";
import { fetchBanners } from "../../features/BannersSlice";
import { URL_IMAGE } from "../../constants/api";
import StaticBanner from "../../assets/zayavka1.png";

import "./Hero.scss";
import "react-alice-carousel/lib/alice-carousel.css";

const Hero = () => {
  const banners = useSelector((state) => state.banner);

  const dispatch = useDispatch();

  const mappedBanners = banners.banners
    ? banners.banners.map((el) => {
        return (
          <Link key={el.id} className="link" to={`/catalog/${el.catalog.name}`}>
            <img src={`${URL_IMAGE}/${el.photo}`} alt={el.name}/>
          </Link>
        );
      })
    : [];

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);
  
  return (
    <div className="hero">
      <div className="hero__banners-swipe">
        <AliceCarousel
          mouseTracking
          items={mappedBanners}
          autoPlay
          autoPlayInterval={4000}
          infinite
        />
        <img className="static-banner" src={StaticBanner} alt="static banner" />
      </div>
    </div>
  );
};

export default Hero;
