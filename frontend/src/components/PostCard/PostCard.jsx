import "./PostCard.css";

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <h3>
        {post.user?.name || "Unknown User"}
      </h3>

      <p>{post.text}</p>

      {post.image && (
        <img
          src={post.image}
          alt="post"
        />
      )}

      <div className="post-actions">
        <button>
          Like ({post.likes?.length || 0})
        </button>
      </div>
    </div>
  );
};

export default PostCard;