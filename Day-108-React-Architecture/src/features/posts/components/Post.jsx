import React from "react";
import { usePost } from "../hook/usePost";

function Post({user, post, loading, handelLike, handelDisLike}) {


  return (
    <div className="posts">
      <div className="user">
        <img
          src={user.profile_image}
          alt="404 user image nout found"
        />
        <p>{user.username}</p>
      </div>
      <img
        src={post.img_url}
        alt="404 post image not found"
      />
      <div className="bottom">
        <div className="buttons">
          <button
          onClick={() => {post.isLiked?handelDisLike(post._id) : handelLike(post._id)}}
          >
            <i className={post.isLiked ? "ri-heart-fill like" : "ri-heart-line"}></i>
          </button>
          <button>
            <i class="ri-chat-1-line"></i>
          </button>
          <button>
            <i class="ri-share-forward-line"></i>
          </button>
        </div>
        <p className="caption">{post.caption}</p>
      </div>
    </div>
  );
}

export default Post;
