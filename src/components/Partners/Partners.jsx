import { useSelector } from 'react-redux';
import requestImg from "../../../public/zayavka2.png";
import './Partners.scss';
import { Link } from 'react-router-dom';
import { URL_IMAGE } from '../../constants/api';

const Partners = () => {
    const partners = useSelector(state => state.partner.partners);
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
                        <img src={`${URL_IMAGE}/uploads/${b.photo}`} alt="" />
                      </Link>
                    );
                  })
                ) : (
                  <h2 className="announcement">No Brands.</h2>
                )
              ) : ""}
            </ul>
          </div>
        </div>
      </section>
  )
}

export default Partners