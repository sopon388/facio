import { useState } from "react";
import { createPost } from "../../services/postService";
import "./CreatePost.css";

const CreatePost = ({ refreshPosts }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("text", text);

    if (image) {
      formData.append("image", image);
    }

    await createPost(formData);

    setText("");
    setImage(null);

    refreshPosts();
  };

  return (
    <form
      className="create-post"
      onSubmit={handleSubmit}
    >
      <textarea
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
      />

      <input
        type="file"
        onChange={(e) =>
          setImage(e.target.files[0])
        }
      />

      <button type="submit">
        Post
      </button>
    </form>
  );
};
export default CreatePost;