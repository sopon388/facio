import API from "../api/axios";


// =========================
// CREATE POST
// =========================
export const createPost = async (
  formData
) => {

  const { data } = await API.post(
    "/posts/create",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data"
      }
    }
  );

  return data;
};


// =========================
// GET POSTS
// =========================
export const getPosts = async () => {

  const { data } = await API.get(
    "/posts"
  );

  return data;
};


// =========================
// LIKE POST
// =========================
export const likePost = async (
  postId
) => {

  const { data } = await API.put(
    `/posts/like/${postId}`
  );

  return data;
};


// =========================
// COMMENT POST
// =========================
export const commentPost = async (
  postId,
  commentData
) => {

  const { data } = await API.post(
    `/posts/comment/${postId}`,
    commentData
  );

  return data;
};