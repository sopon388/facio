import { Link, useNavigate } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {

  const navigate = useNavigate();

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    navigate("/login");
  };

  return (

    <nav className="navbar">

      {/* LOGO */}
      <div className="navbar-logo">

        <div className="logo-circle">
          F
        </div>

        <span>
          Facio
        </span>

      </div>

      {/* NAV LINKS */}
      <div className="navbar-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/friends">
          Friends
        </Link>

        <Link to="/messages">
          Messages
        </Link>

        <Link to="/profile">
          Profile
        </Link>

        <button onClick={handleLogout}>
          Logout
        </button>

      </div>

    </nav>
  );
};

export default Navbar;