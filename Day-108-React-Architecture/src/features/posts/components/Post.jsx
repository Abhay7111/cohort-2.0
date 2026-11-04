import React from "react";

function Post({user, post}) {
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
          <button>
            <i class="ri-heart-line"></i>
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
