import API from "../api/axios";


// =========================
// SEND MESSAGE
// =========================
export const sendMessage =
  async (messageData) => {

    const { data } =
      await API.post(
        "/messages/send",
        messageData
      );

    return data;
  };


// =========================
// GET CONVERSATION
// =========================
export const getMessages =
  async (userId) => {

    const { data } =
      await API.get(
        `/messages/${userId}`
      );

    return data;
  };