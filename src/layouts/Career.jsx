import React from "react";

import AuthFooter from "../components/Footers/AuthFooter";
import CareerList from "../views/examples/CareerList";

class Career extends React.Component {
  componentDidMount() {
    document.body.classList.add("bg-default");
  }

  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }

  render() {
    return (
      <>
        <div className="main-content">
          <div className="clearfix bg-gradient-info">
            <div className="fixed-top" />
          </div>
          <div className="header bg-gradient-info py-7 py-lg-8">
            <div className="separator separator-bottom separator-skew z-index-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-default"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </div>
          <CareerList />
        </div>
        <AuthFooter />
      </>
    );
  }
}

export default Career;