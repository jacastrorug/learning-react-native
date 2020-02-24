import React, { Component } from "react";

import { Link } from "react-router-dom";

import "./styles/Home.css";
import platziConfLogo from "../images/platziconf-logo.svg";
import astronautsImage from "../images/astronauts.svg";

class Home extends Component {

  constructor(props){
      super(props);
      console.log('1. Constructor Home');
  }
  componentDidMount() {
      console.log('3. Montaje Home');
  }

  render() {
    console.log('2. Render Home');
    return (
      <div className="Home">
        <div className="container">
          <div className="row">
            <div className="Home__container col-12 col-md-4">
              <img
                src={platziConfLogo}
                atl="Platzi Conf Logo"
                className="img-fluid mb-2"
              />
              <h1>Badge Management System</h1>
              <Link to="/badges" className="btn btn-primary">
                Start
              </Link>
            </div>
            <div className="Home__container d-none d-md-block col-md-8">
              <img
                src={astronautsImage}
                alt="Astronauts"
                className="img-fluid mb-4"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
