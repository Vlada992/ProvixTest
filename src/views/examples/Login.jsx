import React from "react";
import axios from "axios";

// reactstrap components
import {
  Button,
  Card,
  CardTitle,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Alert
} from "reactstrap";

import './StyleHelpers/Login.css'

class Login extends React.Component {
  state = {
    credentials: {
      email: "",
      password: ""
    },
    isErrorAlertOpened: false,
    error: false
  };

  getJWT = () => {
    axios
      .post("/auth", {
        email: this.state.credentials.email,
        password: this.state.credentials.password
      })
      .then(res => {
        if (res.status === 200 && res.headers.authorization) {
          localStorage.setItem("jwt-token", res.headers.authorization);
          this.props.history.push("/admin/index");
        }
      })
      .catch(e => this.setState({
        credentials: {
          email: "",
          password: ""
        },
        isErrorAlertOpened: true,
        error: true
      }));
  };

  // Login form submit
  loginSubmitHandle = e => {
    e.preventDefault();
    this.getJWT();
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

  // Close invalid credentials Alert
  toggleInvalidCredentials = () => {
    this.setState(oldState => ({
      isErrorAlertOpened: !oldState.isErrorAlertOpened
    }));
  };

  render() {
    const isOpen = this.state.isErrorAlertOpened;
    const error = this.state.error;

    let cardTitle = (
      <div>
        <div className="text-center text-muted mb-4">
          <h5>Log in with your credentials</h5>
        </div>
      </div>
    );

    if (isOpen && error) {
      cardTitle = (
        <Alert
          color="danger"
          className="text-center error-alert"
          onClick={this.toggleInvalidCredentials}
        >
          <h5 className="text-white">
            Invalid username or password!
            <i className="ni ni-fat-remove text-right " />
          </h5>
          <small className="d-block">Please, try again.</small>
        </Alert>
      );
    }

    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <CardTitle>{cardTitle}</CardTitle>
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
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,10}$" 
                      title="Invalid email address"
                      value={this.state.credentials.email}
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
                      value={this.state.credentials.password}
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

export default Login;
