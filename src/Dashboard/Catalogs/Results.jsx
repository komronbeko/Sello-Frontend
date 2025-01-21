/* eslint-disable react/prop-types */
import { Delete, Edit, Check } from "@mui/icons-material";
import axios from "axios";
import { API_BASE_URL } from "../../constants/api";
import { toast } from "react-toastify";
import { useState } from "react";
import { fetchCatalogs } from "../../features/CatalogsSlice";

const Results = ({ catalogs, dispatch }) => {
  const [editMode, setEditMode] = useState(null); // { type: 'catalog' | 'category' | 'nested', id: number, value: string }
  const [modal, setModal] = useState(null); // { type: 'catalog' | 'category' | 'nested', id: number }

  // Handle editing
  const handleEdit = async () => {
    try {
      const { type, id, value } = editMode;
      console.log(editMode);

      const endpoint = `${API_BASE_URL}/${type}/${id}`;
      await axios.patch(endpoint, { name: value });
      toast.success(`${type} updated successfully`);
      setEditMode(null);
      dispatch(fetchCatalogs());
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle deletion
  const handleDelete = async () => {
    try {
      const { type, id } = modal;
      const endpoint = `${API_BASE_URL}/${type}/${id}`;
      await axios.delete(endpoint);
      toast.success(`${type} deleted successfully`);
      setModal(null);
      dispatch(fetchCatalogs());
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="results">
      {catalogs.map((catalog) => (
        <div key={catalog.id} className="catalog">
          <div className="global-wrapper">
            {editMode?.type === "catalog" && editMode.id === catalog.id ? (
              <input
                type="text"
                value={editMode.value}
                onChange={(e) =>
                  setEditMode({ ...editMode, value: e.target.value })
                }
              />
            ) : (
              <h4>{catalog.name}</h4>
            )}
            <div className="actions">
              {editMode?.type === "catalog" && editMode.id === catalog.id ? (
                <Check className="edit" onClick={handleEdit} />
              ) : (
                <>
                  <Edit
                    className="edit"
                    onClick={() =>
                      setEditMode({
                        type: "catalog",
                        id: catalog.id,
                        value: catalog.name,
                      })
                    }
                  />
                  <Delete
                    className="delete"
                    onClick={() =>
                      setModal({ type: "catalog", id: catalog.id })
                    }
                  />
                </>
              )}
            </div>
          </div>
          <ul className="category">
            {catalog.categories.map((category) => (
              <li key={category.id}>
                <div className="global-wrapper">
                  {editMode?.type === "category" &&
                  editMode.id === category.id ? (
                    <input
                      type="text"
                      value={editMode.value}
                      onChange={(e) =>
                        setEditMode({ ...editMode, value: e.target.value })
                      }
                    />
                  ) : (
                    <h5>{category.name}</h5>
                  )}
                  <div className="actions">
                    {editMode?.type === "category" &&
                    editMode.id === category.id ? (
                      <Check className="edit" onClick={handleEdit} />
                    ) : (
                      <>
                        <Edit
                          fontSize="small"
                          className="edit"
                          onClick={() =>
                            setEditMode({
                              type: "category",
                              id: category.id,
                              value: category.name,
                            })
                          }
                        />
                        <Delete
                          fontSize="small"
                          className="delete"
                          onClick={() =>
                            setModal({ type: "category", id: category.id })
                          }
                        />
                      </>
                    )}
                  </div>
                </div>
                <ul>
                  {category.nestedCategories.map((nested) => (
                    <div className="global-wrapper" key={nested.id}>
                      {editMode?.type === "nested-category" &&
                      editMode.id === nested.id ? (
                        <input
                          type="text"
                          value={editMode.value}
                          onChange={(e) =>
                            setEditMode({ ...editMode, value: e.target.value })
                          }
                        />
                      ) : (
                        <li>{nested.name}</li>
                      )}
                      <div className="actions">
                        {editMode?.type === "nested-category" &&
                        editMode.id === nested.id ? (
                          <Check className="edit" onClick={handleEdit} />
                        ) : (
                          <>
                            <Edit
                              fontSize="small"
                              className="edit"
                              onClick={() =>
                                setEditMode({
                                  type: "nested-category",
                                  id: nested.id,
                                  value: nested.name,
                                })
                              }
                            />
                            <Delete
                              fontSize="small"
                              className="delete"
                              onClick={() =>
                                setModal({
                                  type: "nested-category",
                                  id: nested.id,
                                })
                              }
                            />
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Confirmation Modal */}
      {modal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this {modal.type}?</p>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={() => setModal(null)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
