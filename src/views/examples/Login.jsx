import React from "react";

import { Redirect } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col
} from "reactstrap";

class Login extends React.Component {
  state = {
    credentials: {
      email: "",
      password: ""
    },
    redirectToAdmin: false
  };

  // Login form submit
  loginSubmitHandle = e => {
    e.preventDefault();
    // alert('test')
    this.setState({ redirectToAdmin: true });
  };

  // Handle email input
  emailInputHandler = e => {
    let value = e.target.value;
    this.setState(prevState => ({
      credentials: {
        ...prevState.credentials,
        email: value
      }
    }));
  };

  // Handle password input
  passwordInputHandler = e => {
    let value = e.target.value;
    this.setState(prevState => ({
      credentials: {
        ...prevState.credentials,
        password: value
      }
    }));
  };

  render() {
    const redir = this.state.redirectToAdmin;
    if (redir) {
      return <Redirect to="/admin/index" />;
    } else {
      return (
        <>
          <Col lg="5" md="7">
            <Card className="bg-secondary shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>Log in with your credentials</small>
                </div>

                <Form role="form" onSubmit={this.loginSubmitHandle}>
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        name="email"
                        type="email"
                        onChange={e => this.emailInputHandler(e)}
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        name="password"
                        type="password"
                        onChange={e => this.passwordInputHandler(e)}
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                    <Button className="my-4" color="primary" type="submit">
                      Log in
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </>
      );
    }
  }
}

export default Login;
