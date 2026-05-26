import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../../services/authService";

import "./Register.css";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: ""
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  // =========================
  // HANDLE INPUT CHANGE
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

    setError("");

    try {

      setLoading(true);

      const data =
        await registerUser(formData);


      // SAVE TOKEN
      localStorage.setItem(
        "token",
        data.token
      );


      // REDIRECT
      navigate("/");

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Registration Failed"
      );

    } finally {

      setLoading(false);
    }
  };


  return (

    <div className="register-page">

      <form
        className="register-form"
        onSubmit={handleSubmit}
      >

        <h2>
          Create Account
        </h2>


        {error && (

          <div className="error-message">

            {error}

          </div>

        )}


        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />


        <input
          type="email"
          placeholder="Email Address"
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
            ? "Creating..."
            : "Register"}

        </button>


        <p>

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </p>

      </form>

    </div>
  );
};

export default Register;