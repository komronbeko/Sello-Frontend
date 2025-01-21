/* eslint-disable react/prop-types */
import { useState } from "react";

const Results = ({ catalogs, onUpdate, onDelete }) => {
  const [editMode, setEditMode] = useState(null); // { type: 'catalog' | 'category' | 'nested', id: string, value: string }
  const [modal, setModal] = useState(null); // { type: 'catalog' | 'category' | 'nested', id: string }

  const handleEdit = (type, id, value) => {
    setEditMode({ type, id, value });
  };

  const handleSave = () => {
    onUpdate(editMode.type, editMode.id, editMode.value);
    setEditMode(null);
  };

  const handleDelete = () => {
    onDelete(modal.type, modal.id);
    setModal(null);
  };

  return (
    <div className="results">
      {catalogs.map((catalog) => (
        <div key={catalog.id} className="catalog">
          <h4>
            {editMode?.type === "catalog" && editMode.id === catalog.id ? (
              <input
                type="text"
                value={editMode.value}
                onChange={(e) =>
                  setEditMode({ ...editMode, value: e.target.value })
                }
              />
            ) : (
              catalog.name
            )}
            <span className="actions">
              {editMode?.type === "catalog" && editMode.id === catalog.id ? (
                <span className="material-icons" onClick={handleSave}>
                  check
                </span>
              ) : (
                <>
                  <span
                    className="material-icons"
                    onClick={() =>
                      handleEdit("catalog", catalog.id, catalog.name)
                    }
                  >
                    edit
                  </span>
                  <span
                    className="material-icons"
                    onClick={() =>
                      setModal({ type: "catalog", id: catalog.id })
                    }
                  >
                    delete
                  </span>
                </>
              )}
            </span>
          </h4>
          <ul className="category">
            {catalog.categories.map((category) => (
              <li key={category.id}>
                <h5>
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
                    category.name
                  )}
                  <span className="actions">
                    {editMode?.type === "category" &&
                    editMode.id === category.id ? (
                      <span className="material-icons" onClick={handleSave}>
                        check
                      </span>
                    ) : (
                      <>
                        <span
                          className="material-icons"
                          onClick={() =>
                            handleEdit("category", category.id, category.name)
                          }
                        >
                          edit
                        </span>
                        <span
                          className="material-icons"
                          onClick={() =>
                            setModal({ type: "category", id: category.id })
                          }
                        >
                          delete
                        </span>
                      </>
                    )}
                  </span>
                </h5>
                <ul>
                  {category.nestedCategories.map((nested) => (
                    <li key={nested.id}>
                      {editMode?.type === "nested" &&
                      editMode.id === nested.id ? (
                        <input
                          type="text"
                          value={editMode.value}
                          onChange={(e) =>
                            setEditMode({ ...editMode, value: e.target.value })
                          }
                        />
                      ) : (
                        nested.name
                      )}
                      <span className="actions">
                        {editMode?.type === "nested" &&
                        editMode.id === nested.id ? (
                          <span className="material-icons" onClick={handleSave}>
                            check
                          </span>
                        ) : (
                          <>
                            <span
                              className="material-icons"
                              onClick={() =>
                                handleEdit("nested", nested.id, nested.name)
                              }
                            >
                              edit
                            </span>
                            <span
                              className="material-icons"
                              onClick={() =>
                                setModal({ type: "nested", id: nested.id })
                              }
                            >
                              delete
                            </span>
                          </>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ))}

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
