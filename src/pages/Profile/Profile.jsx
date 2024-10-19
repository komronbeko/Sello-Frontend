import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { Skeleton } from "@mui/material";
import ProfileNav from "../../components/ProfileNavbar/ProfileNavbar";
import { fetchUserOne } from "../../features/UserOneSlice";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";
import { API_BASE_URL } from "../../constants/api";

import "./Profile.scss";
import axios from "axios";

const Profile = () => {
  const [modalActive, setActiveModal] = useState(false);
  const [patchLoading, setPatchLoading] = useState(false);
  const [gender, setGender] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user_id } = useParams();
  const token = getAccessTokenFromLocalStorage();
  const { userOne, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!token) navigate("/");

    if (error) {
      toast(error, { type: "error" });
    }

    if (userOne?.gender) {
      setGender(userOne.gender);
    }

    dispatch(fetchUserOne(token));
  }, [token, userOne?.gender, error]);

  function changeGender(e) {
    setGender(e.target.value);
  }

  async function senData(e) {
    e.preventDefault();

    setPatchLoading(true);

    try {
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
      setPatchLoading(false);
    } catch (error) {
      toast(error.message, { type: "error" });
      setPatchLoading(false);
    }
  }

  return (
    <section id="profile">
      {modalActive ? (
        <div id="profile-edit-modal">
          <div className="modal">
            <div className="modal-head">
              <h2>Edit data</h2>
              <p>You can only change certain information here</p>
              <div
                type="button"
                onClick={() => {
                  setActiveModal(false);
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </div>
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
                          onChange={(e) => changeGender(e)}
                          checked={gender == "male" ? true : false}
                        />
                        <label htmlFor="">Male</label>
                      </div>
                      <div className="radio-label">
                        <input
                          value="female"
                          type="radio"
                          name="gender"
                          id=""
                          onChange={(e) => changeGender(e)}
                          checked={gender == "female" ? true : false}
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
      <ProfileNav activePage={"Profile"} user_id={user_id} />
      {loading || patchLoading ? (
        <div id="data">
          <div className="data-head">
            <Skeleton height={60} width="45%" />
            <Skeleton height={30} width="85%" />
          </div>
          <div className="data-body">
            <div id="info">
              <ul>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((el) => (
                  <li key={el}>
                    <Skeleton height={30} />
                    <Skeleton height={30} />
                  </li>
                ))}
              </ul>
              <ul className="with-edit">
                <li className="edit">
                  <Skeleton height={40} width={200} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div id="data">
          <div className="data-head">
            <h3>Personal Information</h3>
            <p>
              This is where your personal information is stored. Click Edit if
              you want to change your information.
            </p>
          </div>
          <div className="data-body">
            <div className="info">
              <ul>
                <li>
                  <span>User name</span>
                  {userOne?.username}
                </li>
                <li>
                  <span>First name</span>
                  {userOne?.f_name ? userOne?.f_name : "Unknown"}
                </li>
                <li>
                  <span>Last name</span>
                  {userOne?.l_name ? userOne?.l_name : "Unknown"}
                </li>
                <li>
                  <span>Phone number</span>
                  {userOne?.phone_number ? userOne?.phone_number : "Unknown"}
                </li>
                <li>
                  <span>Date of birth</span>
                  {userOne?.birthdate ? userOne.birthdate : "Unknown"}
                </li>
                <li>
                  <span>Email</span>
                  {userOne?.email}
                </li>
                <li>
                  <span>Language</span>
                  {userOne?.language ? userOne?.language : "Unknown"}
                </li>
                <li>
                  <span>Gender</span>
                  {userOne?.gender ? userOne?.gender : "Unknown"}
                </li>
              </ul>
              <div className="edit">
                <button
                  onClick={() => {
                    setActiveModal(true);
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
