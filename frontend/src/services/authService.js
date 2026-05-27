import API from "../api/axios";

const BASE_URL = import.meta.env.VITE_API_URL;


// =========================
// REGISTER USER
// =========================
export const registerUser =
  async (userData) => {

    const { data } =
      await API.post(
        `${BASE_URL}/api/auth/register`,
        userData
      );

    return data;
  };


// =========================
// LOGIN USER
// =========================
export const loginUser =
  async (userData) => {

    const { data } =
      await API.post(
        `${BASE_URL}/api/auth/login`,
        userData
      );

    return data;
  };


// =========================
// GET PROFILE
// =========================
export const getProfile =
  async () => {

    const { data } =
      await API.get(
        `${BASE_URL}/api/auth/me`
      );

    return data;
  };