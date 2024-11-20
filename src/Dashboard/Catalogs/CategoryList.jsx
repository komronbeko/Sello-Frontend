/* eslint-disable react/prop-types */
// import React from "react";
import NestedCategoryList from "./NestedCategoryList";

const CategoryList = ({
  categories,
  onDelete,
  onEdit,
  editing,
  editValue,
  onSaveEdit,
  onCancelEdit,
}) => {
  return (
    <ul>
      {categories.map((category) => (
        <li key={category.id}>
          <h5>
            {editing?.type === "category" && editing.id === category.id ? (
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
                {category.name}
                <button onClick={() => onEdit(category, "category")}>
                  Edit
                </button>
                <button onClick={() => onDelete("category", category.id)}>
                  Delete
                </button>
              </>
            )}
          </h5>
          <NestedCategoryList
            nestedCategories={category.nestedCategories}
            onDelete={onDelete}
            onEdit={onEdit}
            editing={editing}
            editValue={editValue}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
          />
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
