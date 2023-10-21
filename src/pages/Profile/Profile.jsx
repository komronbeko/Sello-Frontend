import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import ProfileNav from "../../components/ProfileNavbar/ProfileNavbar";
import { fetchUserOne } from "../../features/UserOneSlice";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";
import User_Avatar from "../../assets/default-user.png";
import { API_BASE_URL } from "../../constants/api";
import { upperCase } from "../../utils/upper-case";

import "./Profile.scss";
import axios from "axios";

const Profile = () => {
  const [modalActive, setActiveModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user_id } = useParams();
  const token = getAccessTokenFromLocalStorage();
  const userOne = useSelector((state) => state.user.userOne);

  useEffect(() => {
    if (!token) navigate("/");

    dispatch(fetchUserOne(token));
  }, [dispatch, navigate, token]);

  async function senData(e) {
    e.preventDefault();
    const {
      username,
      l_name,
      email,
      gender,
      f_name,
      phone_number,
      language,
      birthdate,
    } = e.target.elements;
    try {
      const { data } = await axios.patch(
        `${API_BASE_URL}/user/`,
        {
          username: username.value,
          l_name: l_name.value,
          email: email.value,
          gender: gender.value,
          f_name: f_name.value,
          phone_number: phone_number.value,
          language: language.value,
          birthdate: birthdate.value,
        },
        { headers: { Authorization: "Bearer " + token } }
      );

      toast(data.message, { type: "success" });
      setActiveModal(false);
      dispatch(fetchUserOne(token));
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }

  return (
    <section id="profile-all">
      <section id="profile">
        <ProfileNav activePage={"Profile"} user_id={user_id} />
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
              src={
                userOne?.photo
                  ? `http://localhost:3000/uploads/${userOne?.photo}`
                  : User_Avatar
              }
              alt="user-image"
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
                <div className="table input-table">
                  <div className="inp-label">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      defaultValue={userOne?.username}
                      id="username"
                    />
                  </div>
                  <div className="inp-label">
                    <label htmlFor="last_name">Last-name</label>
                    <input
                      type="text"
                      name="l_name"
                      id="last_name"
                      defaultValue={userOne?.l_name}
                    />
                  </div>
                  <div className="inp-label">
                    <label htmlFor="email">Email</label>
                    <input
                      defaultValue={userOne?.email}
                      type="email"
                      name="email"
                      id="email"
                    />
                  </div>
                  <div className="inp-label">
                    <label htmlFor="gender">Gender</label>
                    <div className="inputs">
                      <div className="radio-label">
                        <input
                          value="male"
                          type="radio"
                          name="gender"
                          id=""
                          required
                        />
                        <label htmlFor="">Male</label>
                      </div>
                      <div className="radio-label">
                        <input
                          value="female"
                          type="radio"
                          name="gender"
                          id=""
                        />
                        <label htmlFor="">Female</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table input-table">
                  <div className="inp-label">
                    <label htmlFor="firs_name">First-name</label>
                    <input
                      type="text"
                      name="f_name"
                      id="firs_name"
                      defaultValue={userOne.f_name}
                      required
                    />
                  </div>
                  <div className="inp-label">
                    <label htmlFor="number">Phone number</label>
                    <input
                      type="number"
                      name="phone_number"
                      id="number"
                      defaultValue={userOne?.phone_number}
                    />
                  </div>
                  <div className="inp-label">
                    <label htmlFor="birth">Birth</label>
                    <input
                      defaultValue={userOne.birthdate}
                      type="date"
                      name="birthdate"
                      id="birth"
                    />
                  </div>
                  <div className="inp-label">
                    <label htmlFor="language">Language</label>
                    <select name="language" id="language">
                      <option value="english">English</option>
                      <option value="russian">Russian</option>
                    </select>
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
                  Cancel
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
