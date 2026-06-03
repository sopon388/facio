import { useState } from "react";
import {Link ,useNavigate } from "react-router-dom";
import API from "../../api/axios";
const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

      if (data.token) {
        localStorage.setItem(
          "token",
          data.token
        );
      }

      setMessage(
        "Registration Successful!"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button type="submit">
          Register
        </button>
      </form>



     {message && (
        <p>{message}</p>
      )}

      <p className="login-link">
        Already have an account?{" "}
        <Link to="/login">
          Login
        </Link>
      </p>

    </div>
  );
};

export default Register;