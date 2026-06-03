import { useState } from "react";

import {
  likePost,
  commentPost
} from "../../services/postService";

import "./PostCard.css";

const PostCard = ({ post }) => {

  const [likes, setLikes] =
    useState(
      post.likes?.length || 0
    );

  const [comment, setComment] =
    useState("");

  const [comments, setComments] =
    useState(
      post.comments || []
    );

  const handleLike = async () => {

    try {

      const data =
        await likePost(post._id);

      setLikes(data.likes);

    } catch (error) {

      console.log(error);
    }
  };

  const handleComment =
    async () => {

      if (!comment.trim()) return;

      try {

        const data =
          await commentPost(
            post._id,
            {
              text: comment
            }
          );

        setComments(
          data.comments
        );

        setComment("");

      } catch (error) {

        console.log(error);
      }
    };

  return (
    <div className="post-card">

      <h3>
        {post.user?.name ||
          "Unknown User"}
      </h3>

      <p>{post.text}</p>

      {post.image && (
        <img
          src={post.image}
          alt="post"
        />
      )}

      <div className="post-actions">

        <button
          onClick={handleLike}
        >
          Like ({likes})
        </button>

      </div>

      <div className="comment-box">

        <input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) =>
            setComment(
              e.target.value
            )
          }
        />

        <button
          onClick={handleComment}
        >
          Comment
        </button>

      </div>

      <div className="comments">

        {comments.map(
          (c, index) => (

            <p key={index}>
              <strong>
                {c.user?.name ||
                  "User"}
              </strong>
              : {c.text}
            </p>

          )
        )}

      </div>

    </div>
  );
};

export default PostCard;