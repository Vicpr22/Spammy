import React from "react";

const EditButton = ({ onEdit }) => {
  return (
    <button onClick={onEdit} className="edit-button">
      Edit
    </button>
  );
};

export default EditButton;
