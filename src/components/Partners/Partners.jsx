import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { URL_IMAGE } from '../../constants/api';
import requestImg from "../../assets/zayavka2.png";

import './Partners.scss';
import { useEffect } from 'react';
import { fetchPartners } from '../../features/PartnersSlice';

const Partners = () => {
  const dispatch = useDispatch();

    const partners = useSelector(state => state.partner.partners);

    useEffect(() => {
      dispatch(fetchPartners());
    }, [dispatch]);

  return (
    <section id="partners-link">
        <img src={requestImg} alt="" />
        <div className="partners">
          <h2>Our partners</h2>
          <p>
            By cooperating with us, you can increase the sales of your store.
          </p>
          <div className="cards">
            <ul className="links">
              {partners ? (
                partners.length ? (
                  partners?.map((b) => {
                    return (
                      <Link
                        key={b.id}
                        className="link-btn"
                      >
                        <img src={`${URL_IMAGE}/${b.photo}`} alt="" />
                      </Link>
                    );
                  })
                ) : (
                  <h2 className="announcement">No Partners.</h2>
                )
              ) : ""}
            </ul>
          </div>
        </div>
      </section>
  );
};

export default Partners;