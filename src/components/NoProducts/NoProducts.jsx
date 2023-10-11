import { Link } from "react-router-dom"
import Empty from "../../assets/empty_orders.png";

const NoProducts = () => {
  return (
    <div className="no-products">
              <div className="start">
                <p className="no-products-text">
                  Sorry, there are no favorite products here yet.
                </p>
                <Link to="/" className="link">
                  Start shopping
                </Link>
              </div>
              <img src={Empty} alt="" />
            </div>
  )
}

export default NoProducts