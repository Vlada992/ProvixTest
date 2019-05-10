import React from "react";
import axios from "axios";

import { Redirect } from "react-router-dom";

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

class Login extends React.Component {
  state = {
    credentials: {
      email: "",
      password: ""
    },
    redirectToAdmin: false,
    loading: true,
    isOpened: false
  };

  getJWT = () => {
    axios
      .post("http://136ea.k.time4vps.cloud:9090/api/v1/auth", {
        email: this.state.credentials.email,
        password: this.state.credentials.password
      })
      .then(res => {
        if (res.status === 200 && res.headers.authorization) {
          localStorage.setItem("jwt-token", res.headers.authorization);
          this.setState({ redirectToAdmin: true });
        } else {
          //alert("invalid credentials");
          this.setState({ loading: false });
        }
      })
      .catch(e => console.log(e));
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
    this.setState(oldState => ({ isOpened: !oldState.isOpened }));
  };

  // Check if the status from the server is 401 when the component is mounted 
  componentDidMount() {
    axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error.response.status === 401) {
          this.setState({
            credentials: {
              email: "",
              password: ""
            },
            redirectToAdmin: false,
            loading: true,
            isOpened: false
          });
        }
        return error;
      }
    );
  }

  render() {
    const redir = this.state.redirectToAdmin;
    const jwt = localStorage.getItem("jwt-token");
    const loading = this.state.loading;
    const isOpen = this.state.isOpened;

    let cardTitle = (
      <div>
        <div className="text-center text-muted mb-4">
          <h5>Log in with your credentials</h5>
        </div>
      </div>
    );

    if (!loading && !isOpen) {
      cardTitle = (
        <Alert
          color="danger"
          className="text-center"
          onClick={this.toggleInvalidCredentials}
          style={{ cursor: "pointer" }}
        >
          <h5 className="text-white">
            {" "}
            Invalid username or password!{" "}
            <i className="ni ni-fat-remove text-right " />
          </h5>
          <small className="d-block">Please,try again.</small>
        </Alert>
      );
    }

    if (redir && jwt !== "null") {
      return <Redirect to="/admin/index" />;
    } else {
      return (
        <>
          {localStorage.setItem("jwt-token", null)}
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
}

export default Login;
