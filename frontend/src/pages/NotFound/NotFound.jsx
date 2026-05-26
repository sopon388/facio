import { Link } from "react-router-dom";

import "./NotFound.css";

const NotFound = () => {

  return (

    <div className="notfound-page">

      <h1>
        404
      </h1>

      <p>
        Page Not Found
      </p>

      <Link to="/">
        Go Home
      </Link>

    </div>
  );
};

export default NotFound;