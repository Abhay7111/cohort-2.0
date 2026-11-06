import React, { useState, useRef } from "react";
import "../style/createPost.scss";
import { usePost } from "../hook/usePost";
import { useNavigate } from "react-router";

function CreatePost() {
  const [caption, setCaption] = useState("");
  const [error, setError] = useState("");

  const postImageInputFieldRef = useRef(null);
  const { loading, handelCreatePost } = usePost();
  const navigate = useNavigate();

  async function handelSubmit(e) {
    e.preventDefault();

    const file = postImageInputFieldRef.current.files[0];
    if (!file) {
      setError("Please select an image.");
      return;
    }

    setError("");
    try {
      await handelCreatePost(file, caption);
      navigate("/");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Failed to create post."
      );
    }
  }

  if (loading) {
    return (
      <main>
        <h1>Creating Post...</h1>
      </main>
    );
  }

  return (
    <main className="create-post">
      <div className="form-container">
        <h1>Create Post</h1>

        <form onSubmit={handelSubmit}>
          {error && <p role="alert">{error}</p>}
          <label htmlFor="postImage" className="button post-image-lable">
            Select image <i class="ri-arrow-down-s-fill"></i>
          </label>
          <input
            type="file"
            name="postImage"
            id="postImage"
            ref={postImageInputFieldRef}
            accept=".png, .jpg"
            hidden
          />
          <input
            type="text"
            name="caption"
            id="caption"
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value);
            }}
            placeholder="Enter caption caption"
          />
          <button className="button primary-button">Create Post</button>
        </form>
      </div>
    </main>
  );
}

export default CreatePost;
