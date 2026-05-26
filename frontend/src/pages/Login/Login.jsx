import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../../services/authService";

import "./Login.css";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: ""
    });

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (e) => {

    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value
    });
  };


  // =========================
  // HANDLE SUBMIT
  // =========================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      // LOGIN API
      const data =
        await loginUser(formData);


      console.log(data);


      // SAVE TOKEN
      localStorage.setItem(
        "token",
        data.token
      );


      // REDIRECT
      navigate("/");

    } catch (error) {

      console.log(error);

      setError(
        error.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);
    }
  };


  return (

    <div className="login-page">

      <form
        className="login-form"
        onSubmit={handleSubmit}
      >

        <h2>
          Login
        </h2>


        {error && (

          <div className="error-message">

            {error}

          </div>

        )}


        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />


        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />


        <button
          type="submit"
          disabled={loading}
        >

          {loading
            ? "Logging in..."
            : "Login"}

        </button>


        <p>

          Don't have an account?

          <Link to="/register">

            Register

          </Link>

        </p>

      </form>

    </div>
  );
};

export default Login;