import React from "react";

import "./styles/NotFound.css";
import notFoundImage from "../images/404NotFound.png";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="NotFound">
      <div className="container">
        <div className="row">
          <div className="NotFound__col d-md-bloc col-md-6">
            <img
              src={notFoundImage}
              alt="404 NOTFOUND"
              className="img-fluid mb-2"
            />
          </div>
          <div className="NotFound__col col-12 col-md-4">
            <h1>404: PAGE NOT FOUND</h1>
            <p>Click to go home.</p>
            <Link to="/" className="btn btn-primary">
                HOME
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
