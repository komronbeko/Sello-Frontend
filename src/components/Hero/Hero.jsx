/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import StaticBanner from "../../../public/zayavka1.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanners } from "../../features/BannersSlice";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import "./Hero.scss";
import { Link } from "react-router-dom";

const Hero = () => {
  const banners = useSelector((state) => state.banner);
  const dispatch = useDispatch();

  const mappedBanners = banners.banners
    ? banners.banners.map((el) => {
        return (
          <Link key={el.id} className="link" to={`/catalog/${el.catalog_id}`}>
            <img src={`http://localhost:3000/uploads/${el.photo}`} alt="" />
          </Link>
        );
      })
    : [];

  useEffect(() => {
    dispatch(fetchBanners());
  }, []);
  return (
    <div className="hero">
      <div className="hero__banners-swipe">
        <AliceCarousel
          mouseTracking
          items={mappedBanners}
          autoPlay
        //   disableButtonsControls={true}
          autoPlayInterval={4000}
          infinite
        />
        <img className="static-banner" src={StaticBanner} alt="static banner" />
      </div>
    </div>
  );
};

export default Hero;
