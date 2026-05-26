/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useEffect,
  useState
} from "react";

import API from "../api/axios";


// =========================
// CREATE CONTEXT
// =========================
export const AuthContext =
  createContext();


// =========================
// AUTH PROVIDER
// =========================
const AuthProvider = ({
  children
}) => {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  // =========================
  // LOAD USER
  // =========================
  const loadUser = async () => {

    try {

      const { data } =
        await API.get("/auth/me");

      setUser(data.user);

    } catch {

      localStorage.removeItem(
        "token"
      );

    } finally {

      setLoading(false);
    }
  };


  // =========================
  // INITIAL LOAD
  // =========================
  useEffect(() => {

    const init = async () => {

      if (
        localStorage.getItem(
          "token"
        )
      ) {

        await loadUser();

      } else {

        setLoading(false);
      }
    };

    init();

  }, []);


  return (

    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading
      }}
    >

      {children}

    </AuthContext.Provider>
  );
};

export default AuthProvider;