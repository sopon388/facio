import API from "../api/axios";

export const registerUser = async (userData) => {
  const { data } = await API.post(
    "/auth/register",
    userData
  );

  return data;
};

export const loginUser = async (userData) => {
  const { data } = await API.post(
    "/auth/login",
    userData
  );

  return data;
};

export const getProfile = async () => {
  const { data } = await API.get(
    "/auth/me"
  );

  return data;
};