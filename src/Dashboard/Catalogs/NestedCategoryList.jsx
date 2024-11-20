/* eslint-disable react/prop-types */
// import React from "react";

const NestedCategoryList = ({
  nestedCategories,
  onDelete,
  onEdit,
  editing,
  editValue,
  onSaveEdit,
  onCancelEdit,
}) => {
  return (
    <ul>
      {nestedCategories.map((nested) => (
        <li key={nested.id}>
          {editing?.type === "nestedCategory" && editing.id === nested.id ? (
            <form onSubmit={onSaveEdit}>
              <input
                value={editValue}
                onChange={(e) => onEdit(e.target.value)}
              />
              <button type="submit">Save</button>
              <button onClick={onCancelEdit}>Cancel</button>
            </form>
          ) : (
            <>
              {nested.name}
              <button onClick={() => onEdit(nested, "nestedCategory")}>
                Edit
              </button>
              <button onClick={() => onDelete("nested-category", nested.id)}>
                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NestedCategoryList;
