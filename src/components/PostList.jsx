import React from "react";
import Post from "./Post.jsx";

const PostList = ({
  posts,
  onLike,
  onCommentSubmit,
  newCommentText,
  onCommentChange,
  onDelete,
  onEdit,
}) => {
  return (
    <ul className="post-list-container">
      {posts &&
        posts.map(
          (post) =>
            post && ( // Add a check for post
              <Post
                key={post.id}
                post={post}
                onEdit={() => onEdit(post)}
                onDelete={() => onDelete(post.id)}
                onLike={() => onLike(post.id)}
                onCommentSubmit={() => onCommentSubmit(post.id)}
                newCommentText={newCommentText}
                onCommentChange={onCommentChange}
              />
            )
        )}
    </ul>
  );
};

export default PostList;
