import React from "react";

const LikeButton = ({ onLike }) => {
  return (
    <button onClick={onLike} className="like-button">
      Like
    </button>
  );
};

export default LikeButton;
