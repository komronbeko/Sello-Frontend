import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { URL_IMAGE } from "../../constants/api";
import requestImg from "../../assets/zayavka2.png";

import { useEffect } from "react";
import { fetchPartners } from "../../features/PartnersSlice";
import { Grid, Skeleton } from "@mui/material";
import noImagePng from "../../assets/no-image-icon-6.png";

import "./Partners.scss";

const Partners = () => {
  const dispatch = useDispatch();

  const { partners, loading } = useSelector((state) => state.partner);

  function displayPartners() {
    if (loading) {
      return (
        <div className="partners-skeleton partners-grid-common">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((el) => (
            <Grid item key={el}>
              <Skeleton variant="rounded" />
            </Grid>
          ))}
        </div>
      );
    }

    return (
      <ul className="logos-container partners-grid-common">
        {partners?.map((el) => (
          <Link key={el.id} className="logo">
            <img
              src={el.photo ? `${URL_IMAGE}/${el.photo}` : noImagePng}
              alt={el.name}
            />
          </Link>
        ))}
      </ul>
    );
  }

  useEffect(() => {
    dispatch(fetchPartners());
    // if (error) {
    //   toast(error, { type: "error" });
    // }
  }, []);

  return (
    <section id="partners">
      {/* <div className="partners-left"> */}
      <img src={requestImg} alt="" />
      {/* </div> */}
      <div className="partners-right">
        <div>
          <h3>Our Partners</h3>
          <p>
            By cooperating with us, you can increase the sales of your store.
          </p>
        </div>
        <div className="partner-logos">{displayPartners()}</div>
      </div>
    </section>
  );
};

export default Partners;
