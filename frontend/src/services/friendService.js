import API from "../api/axios";


// =========================
// SEND FRIEND REQUEST
// =========================
export const sendFriendRequest =
  async (userId) => {

    const { data } =
      await API.post(
        `/friends/send/${userId}`
      );

    return data;
  };


// =========================
// GET FRIEND REQUESTS
// =========================
export const getFriendRequests =
  async () => {

    const { data } =
      await API.get(
        "/friends/requests"
      );

    return data;
  };


// =========================
// ACCEPT FRIEND REQUEST
// =========================
export const acceptFriendRequest =
  async (requestId) => {

    const { data } =
      await API.put(
        `/friends/accept/${requestId}`
      );

    return data;
  };


// =========================
// GET FRIENDS
// =========================
export const getFriends =
  async () => {

    const { data } =
      await API.get(
        "/friends"
      );

    return data;
  };