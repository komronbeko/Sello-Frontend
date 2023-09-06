import { useEffect, useState } from "react";
import "./Profile.scss";
import User from "../../assets/default-user.png";
import ProfileNav from "../../components/ProfileNavbar/ProfileNavbar";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOne } from "../../features/UserOneSlice";
import { useNavigate, useParams } from "react-router";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user_id} = useParams();

  const [modalActive, setActiveModal] = useState(false);
  const [gender, setGender] = useState(null);
  const [values, setValues] = useState({
    username: "",
    l_name: "",
    f_name: "",
    email: "",
    phone_number: "",
    birthdate: "",
    language: "",
    gender: "",
    photo: "",
  });
  const [update, setUpdate] = useState(false);
  const [file, setFile] = useState(null);

  const userOne = useSelector((state) => state.user.userOne);
  const token = getAccessTokenFromLocalStorage();


  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  function upperCase(str) {
    if (str) {
      return str[0].toUpperCase() + str.slice(1);
    }
  }
  
  useEffect(() => {
    if(!token) navigate("/")
    dispatch(fetchUserOne());
    (async function () {
      setUpdate(false);
      setGender(userOne.gender);
    })();
  }, [update, userOne, dispatch, navigate, token]);

  
  async function senData(e) {
    e.preventDefault();
    if (
      !file &&
      !values.username &&
      !values.l_name &&
      !values.email &&
      !values.f_name &&
      !values.phone_number &&
      !values.birthdate &&
      !values.language &&
      !values.gender
    )
      return toast("Nothing to update", { type: "error" });
    const form = new FormData();
    form.append("file", file);
    try {
      if (file) {
        const { data: photo } = await axios.post("/file", form);
        const { data } = await axios.put("/profile/update", {
          ...values,
          photo: photo.name,
        });
        toast.success(data.message, { type: "success" });
        setActiveModal(false);
        setUpdate(true);
      } else {
        if (gender) {
          const { data } = await axios.put("/profile/update", {
            ...values,
            gender,
          });
          toast.success(data.message, { type: "success" });
          setActiveModal(false);
          setUpdate(true);
        } else {
          const { data } = await axios.put("/profile/update", values);
          toast.success(data.message, { type: "success" });
          setActiveModal(false);
          setUpdate(true);
        }
      }
    } catch (error) {
      toast(error.response.data.message, { type: "error" });
    }
  }
  return (
    <section id="profile-all">
      <section id="profile">
        <ProfileNav activePage={"Profile"} user_id={user_id}/>
        <div id="data">
          <div className="data-head">
            <h3>Personal Information</h3>
            <p>
              This is where your personal information is stored. Click Edit if
              you want to change your information.
            </p>
          </div>
          <div className="data-body">
            <img
              src={userOne?.photo ? `http://localhost:5000/${userOne?.photo}` : User}
              alt=""
            />
            <div id="info">
              <ul>
                <li>
                  <span>FullName</span>
                  {userOne?.f_name} {userOne?.l_name}
                </li>
                <li>
                  <span>Phone number</span>+{userOne?.phone_number}
                </li>
              </ul>
              <ul>
                <li>
                  <span>Email</span>
                  {userOne?.email}
                </li>
                <li>
                  <span>Language of communication with Sello</span>
                  {upperCase(userOne?.language)}
                </li>
              </ul>
              <ul className="with-edit">
                <li>
                  <span>Gender</span>
                  {upperCase(userOne?.gender)}
                </li>
                <li className="edit">
                  <button
                    onClick={() => {
                      setActiveModal(true);
                    }}
                  >
                    Edit
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {modalActive ? (
        <div id="profile-edit-modal">
          <div className="modal">
            <div className="modal-head">
              <div className="text">
                <h2>Edit data</h2>
                <p>You can only change certain information here</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveModal(false);
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <form className="modal-body" onSubmit={senData}>
              <div className="form-body">
                <div className="table">
                  <img
                    src={
                      userOne?.photo ? `http://localhost:5000/${userOne?.photo}` : User
                    }
                    alt=""
                  />
                  <label htmlFor="file_inp" id="file_lable">
                    Edit photo
                  </label>
                  <input
                    type="file"
                    name="photo"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                    id="file_inp"
                    hidden
                  />
                </div>
                <div className="table input-table">
                  <div className="inp-label">
                    <label htmlFor="username">Username</label>
                    <input
                      onChange={handleInputChange}
                      value={values.username}
                      type="text"
                      name="username"
                      defaultValue={userOne?.username}
                      id="username"
                      placeholder={userOne?.username}
                    />
                  </div>
                  <div className="inp-label">
                    <label htmlFor="last_name">Last-name</label>
                    <input
                      onChange={handleInputChange}
                      value={values.l_name}
                      type="text"
                      name="l_name"
                      id="last_name"
                      defaultValue={userOne?.l_name}
                      placeholder={userOne?.l_name}
                    />
                  </div>
                  <div className="inp-label">
                    <label htmlFor="email">Email</label>
                    <input
                      onChange={handleInputChange}
                      value={values.email}
                      defaultValue={userOne?.email}
                      type="email"
                      name="email"
                      id="email"
                      placeholder={userOne?.email}
                    />
                  </div>
                  <div className="inp-label">
                    <label htmlFor="gender">Gender</label>
                    <div className="inputs">
                      <div className="radio-label">
                        {userOne?.gender === "male" ? (
                          <input
                            onChange={() => {
                              setGender("male");
                              setValues({ ...values, gender: "male" });
                            }}
                            value={values.gender}
                            type="radio"
                            name="gender"
                            id=""
                            checked
                          />
                        ) : (
                          <input
                            onChange={() => {
                              setGender("male");
                              setValues({ ...values, gender: "male" });
                            }}
                            value={values.gender}
                            type="radio"
                            name="gender"
                            id=""
                          />
                        )}
                        <label htmlFor="">Male</label>
                      </div>
                      <div className="radio-label">
                        {userOne?.gender === "female" ? (
                          <input
                            onChange={() => {
                              setGender("female");
                              setValues({ ...values, gender: "female" });
                            }}
                            value={values.gender}
                            type="radio"
                            name="gender"
                            id=""
                            checked
                          />
                        ) : (
                          <input
                            onChange={() => {
                              setGender("female");
                              setValues({ ...values, gender: "female" });
                            }}
                            value={values.gender}
                            type="radio"
                            name="gender"
                            id=""
                          />
                        )}
                        <label htmlFor="">Female</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table input-table">
                  <div className="inp-label">
                    <label htmlFor="firs_name">First-name</label>
                    <input
                      onChange={handleInputChange}
                      value={values.f_name}
                      type="text"
                      name="f_name"
                      id="firs_name"
                      placeholder={userOne?.f_name}
                    />
                  </div>
                  <div className="inp-label">
                    <label htmlFor="number">Phone number</label>
                    <input
                      onChange={handleInputChange}
                      value={values.phone_number}
                      type="number"
                      name="phone_number"
                      id="number"
                      placeholder={userOne?.phone_number}
                    />
                  </div>
                  <div className="inp-label">
                    <label htmlFor="birth">Birth</label>
                    <input
                      onChange={handleInputChange}
                      value={values.birthdate}
                      type="date"
                      name="birthdate"
                      id="birth"
                      placeholder={userOne?.birthdate}
                    />
                  </div>
                  <div className="inp-label">
                    <label htmlFor="language">Language</label>
                    {userOne?.language === "English" ? (
                      <select
                        onChange={handleInputChange}
                        value={values.language}
                        type="number"
                        name="language"
                        id="language"
                      >
                        <option value="English">English</option>
                        <option value="Russian">Russian</option>
                        <option value="Uzbek">Uzbek</option>
                      </select>
                    ) : null}
                    {userOne?.language === "Russian" ? (
                      <select
                        onChange={handleInputChange}
                        value={values.language}
                        type="number"
                        name="language"
                        id="language"
                      >
                        <option value="Russian">Russian</option>
                        <option value="English">English</option>
                        <option value="Uzbek">Uzbek</option>
                      </select>
                    ) : null}
                    {userOne?.language === "Uzbek" ? (
                      <select
                        onChange={handleInputChange}
                        value={values.language}
                        type="number"
                        name="language"
                        id="language"
                      >
                        <option value="Uzbek">Uzbek</option>
                        <option value="English">English</option>
                        <option value="Russian">Russian</option>
                      </select>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="form-footer">
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal(false);
                  }}
                >
                  Cancle
                </button>
                <button>Save</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Profile;
