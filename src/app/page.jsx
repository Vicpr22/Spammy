"use client";
import React, { useEffect, useState } from "react";
import PostList from "@/components/PostList.jsx";
import LikeButton from "@/components/LikeButton.jsx";
import DeleteButton from "@/components/DeleteButton.jsx";
import EditButton from "@/components/EditButton.jsx";

const API = "https://spammer-theta.vercel.app";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [newCommentText, setNewCommentText] = useState("");

  const fetchPostsAndComments = async () => {
    try {
      const postsResponse = await fetch(`${API}/api/posts`);
      const postsData = await postsResponse.json();
      setPosts(postsData.posts);

      // Fetch comments for each post
      const postsWithComments = await Promise.all(
        postsData.posts.map(async (post) => {
          const commentsResponse = await fetch(
            `${API}/api/posts/${post.id}/comments`
          );
          const commentsData = await commentsResponse.json();
          return { ...post, comments: commentsData.comments };
        })
      );

      setPosts(postsWithComments);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPostsAndComments();
  }, []);

  const handlePostSubmit = async () => {
    try {
      const response = await fetch(`${API}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newPostText,
        }),
      });
      const data = await response.json();
      setPosts([...posts, data.post]);
      setNewPostText("");
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const handlePostEdit = async () => {
    if (!selectedPost) return;

    try {
      const response = await fetch(`${API}/api/posts/${selectedPost.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newPostText,
        }),
      });
      const data = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === data.post.id ? data.post : post))
      );
      setNewPostText("");
      setSelectedPost(null);
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  const handlePostDelete = async (postId) => {
    try {
      const response = await fetch(`${API}/api/posts/${postId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== data.post.id)
      );
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleCommentSubmit = async (postId) => {
    try {
      // Check if newCommentText is not empty
      if (!newCommentText.trim()) {
        return;
      }

      const response = await fetch(`${API}/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newCommentText,
        }),
      });
      const data = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: Array.isArray(post.comments)
                  ? [...post.comments, data.comment]
                  : [data.comment],
              }
            : post
        )
      );
      setNewCommentText("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const response = await fetch(`${API}/api/posts/${postId}/likes`, {
        method: "POST",
      });
      const data = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? data.post : post))
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div className="app-container">
      <h1 id="title" className="app-title">
        Spammer
      </h1>

      <div className="post-form-container">
        <h2>{selectedPost ? "Edit Post" : "Create a new post"}</h2>
        <input
          type="text"
          value={selectedPost ? newPostText : newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
          className="post-input"
        />
        {selectedPost ? (
          <EditButton onEdit={handlePostEdit} />
        ) : (
          <button onClick={handlePostSubmit} className="post-submit-button">
            Post
          </button>
        )}
      </div>

      <div className="post-list-container">
        <h2>Posts</h2>
        <PostList
          posts={posts}
          onEdit={(post) => setSelectedPost(post)}
          onDelete={handlePostDelete}
          onLike={handleLikePost}
          onCommentSubmit={handleCommentSubmit}
          newCommentText={newCommentText}
          onCommentChange={(value) => setNewCommentText(value)}
          renderButtons={(post) => (
            <>
              <EditButton onEdit={() => setSelectedPost(post)} />
              <DeleteButton onDelete={() => handlePostDelete(post.id)} />
              <LikeButton onLike={() => handleLikePost(post.id)} />
            </>
          )}
        />
      </div>
    </div>
  );
};

export default Home;
