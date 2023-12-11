import React from "react";
import LikeButton from "./LikeButton.jsx";
import DeleteButton from "./DeleteButton.jsx";
import EditButton from "./EditButton.jsx";

const Post = ({
  post,
  onEdit,
  onDelete,
  onLike,
  onCommentSubmit,
  newCommentText,
  onCommentChange,
}) => {
  return (
    <div className="post-item">
      <h3>{post.text}</h3>
      <p>Likes: {post.likes}</p>
      <EditButton onEdit={onEdit} />
      <DeleteButton onDelete={() => onDelete(post.id)} />{" "}
      {/* Ensure post.id is defined */}
      <LikeButton onLike={onLike} />
      <div className="comment-section">
        {post.comments &&
          post.comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <p>{comment.text}</p>
            </div>
          ))}
      </div>
      <div className="comment-form">
        <input
          type="text"
          value={newCommentText}
          onChange={(e) => onCommentChange(e.target.value)}
          className="comment-input"
        />
        <button onClick={onCommentSubmit} className="comment-submit-button">
          Comment
        </button>
      </div>
    </div>
  );
};

export default Post;
