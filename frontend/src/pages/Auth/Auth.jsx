import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Auth = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>Facio</h1>

        <p>Welcome to Facio</p>

        <button
          className="login-btn"
          onClick={() => navigate("/login")}
        >
          Login
        </button>

        <button
          className="register-btn"
          onClick={() => navigate("/register")}
        >
          Register
        </button>

      </div>

    </div>
  );
};

export default Auth;