/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Row } from "reactstrap";

class Login extends React.Component {
  render() {
    return (
      <>
        <footer className="py-5">
          <Container>
            <Row className='d-flex justify-content-center'>
              <div className="text-muted">
                © 2019
                <h3 className="font-weight-bold ml-1 d-inline text-white">
                  Provix
                </h3>
              </div>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default Login;
