import './NotFound.scss';
import NotFoundImg from "../../assets/notfound.jpg";


const NotFound = () => {
  return (
    <div className="not-found">
      <img src={NotFoundImg} alt="" />
    </div>
  )
}

export default NotFound