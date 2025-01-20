import { useState, useEffect } from "react";
import axios from "axios";
import "./Banners.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanners } from "../../features/BannersSlice";
import { API_BASE_URL, URL_IMAGE } from "../../constants/api";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";
import { toast } from "react-toastify";

const Banners = () => {
  const { banners } = useSelector((state) => state.banner);
  const { catalogs } = useSelector((state) => state.catalog);
  const [newBanner, setNewBanner] = useState({
    title: "",
    catalog_id: "",
    photo: "",
  });
  const [editingBanner, setEditingBanner] = useState(null);
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const token = getAccessTokenFromLocalStorage();

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("photo", file);
    const { data } = await axios.post(`${API_BASE_URL}/file`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    });
    return data.name;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const photoPath = file ? await handleFileUpload() : newBanner.photo;
      const payload = { ...newBanner, photo: photoPath };

      if (editingBanner) {
        const { data } = await axios.patch(
          `${API_BASE_URL}/banner/${editingBanner.id}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        toast(data.message, { type: "success" });
      } else {
        const { data } = await axios.post(`${API_BASE_URL}/banner`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        toast(data.message, { type: "success" });
      }

      setNewBanner({ title: "", catalog_id: "", photo: "" });
      setFile(null);
      setEditingBanner(null);
      dispatch(fetchBanners());
      setIsModalOpen(false);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  const handleEdit = (banner) => {
    setIsModalOpen(true);
    setEditingBanner(banner);
    setNewBanner(banner);
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${API_BASE_URL}/banner/${id}`, {
        headers: { Authorization: "Bearer " + token },
      });
      dispatch(fetchBanners());
      toast(data.message, { type: "default" });
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBanner(null);
    setNewBanner({ title: "", catalog_id: "", photo: "" });
    setFile(null);
  };

  const openModal = (banner = null) => {
    setEditingBanner(banner);
    setNewBanner(banner || { title: "", catalog_id: "", photo: "" });
    setIsModalOpen(true);
  };

  useEffect(() => {
    dispatch(fetchBanners());
  }, []);

  return (
    <div id="banners">
      <div className="heading">
        <h1>Banners</h1>
        <button className="post-button" onClick={() => openModal()}>
          Post Banner
        </button>
      </div>

      <div className="banners-list">
        {banners.map((banner) => (
          <div key={banner.id} className="banner-card">
            <img src={`${URL_IMAGE}/${banner.photo}`} alt={banner.title} />
            <h2>{banner.title}</h2>
            <p>Catalog: {banner.catalog.name}</p>
            <button onClick={() => handleEdit(banner)}>Edit</button>
            <button onClick={() => handleDelete(banner.id)}>Delete</button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <form className="banner-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={newBanner.title}
                onChange={(e) =>
                  setNewBanner({ ...newBanner, title: e.target.value })
                }
                required
              />
              <select
                name="catalog_id"
                id="catalog_id"
                onChange={(e) =>
                  setNewBanner({ ...newBanner, catalog_id: e.target.value })
                }
              >
                <option disabled selected>
                  Select Catalog
                </option>
                {catalogs.length
                  ? catalogs.map((catalog) => (
                      <option
                        key={catalog.id}
                        value={catalog.id}
                        selected={catalog.id == newBanner.catalog_id}
                      >
                        {catalog.name}
                      </option>
                    ))
                  : null}
              </select>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              <button type="submit">
                {editingBanner ? "Update" : "Create"} Banner
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banners;
