import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { URL_IMAGE } from '../../constants/api';
import requestImg from "../../assets/zayavka2.png";

import './Partners.scss';
import { useEffect } from 'react';
import { fetchPartners } from '../../features/PartnersSlice';
import { Grid, Skeleton } from '@mui/material';
import { toast } from 'react-toastify';

const Partners = () => {
  const dispatch = useDispatch();

  const { partners, loading, error } = useSelector(state => state.partner);

  function displayPartners() {
    if (loading || !partners.length) {
      return (
        <Grid container columnSpacing={2} rowSpacing={3} columns={4}>
          {
            [1, 2, 3, 4, 5, 6, 7, 8].map(el => (
              <Grid item key={el}>
                <Skeleton variant="rounded" width={180} height={80} />
              </Grid>
            ))
          }
        </Grid>
      )
    }

    return (
      <ul className="links">
        {
          partners?.map((el) => (
            <Link
              key={el.id}
              className="link-btn"
            >
              <img src={`${URL_IMAGE}/${el.photo}`} alt={el.name} />
            </Link>
          )
          )
        }
      </ul>
    )
  }

  useEffect(() => {
    dispatch(fetchPartners());
    if (error) {
      toast(error, { type: "error" });
    }
  }, [error]);


  return (
    <section id="partners-link">
      <img src={requestImg} alt="" />
      <div className="partners">
        <h2>Our partners</h2>
        <p>
          By cooperating with us, you can increase the sales of your store.
        </p>
        <div className="cards">
          {displayPartners()}
        </div>
      </div>
    </section>
  );
};

export default Partners;