import { useEffect } from "react";
import StaticBanner from "../../assets/zayavka1.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanners } from "../../features/BannersSlice";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { URL_IMAGE } from "../../constants/api";
import "./Hero.scss";

const Hero = () => {
  const banners = useSelector((state) => state.banner);
  const dispatch = useDispatch();

  const mappedBanners = banners.banners
    ? banners.banners.map((el) => {
        return (
          <Link key={el.id} className="link" to={`/catalog/${el.catalog_id}`}>
            <img src={`${URL_IMAGE}/uploads/${el.photo}`} alt="" />
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
