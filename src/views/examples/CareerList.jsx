import React from "react";
import axios from "axios";

// reactstrap components
import { Container, Row, Col, Alert } from "reactstrap";
import Position from "./Position";

class CareerList extends React.PureComponent {
  state = {
    positions: [],
    positionsToShow: [],
    limit: 10,
    next: 10,
    scrolling: false,
    succesAlert: false,
    noError: true
  };

  componentDidMount() {
    this.loadPositions();
    this.showPositionsFromTo(0, this.state.limit);
    window.onscroll = () => {
      this.setState({ scrolling: true });
      if (
        window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight &&
        this.state.positions.length >= this.state.next
      ) {
        this.showPositionsFromTo(
          this.state.next,
          this.state.limit + this.state.next
        );
        const next = this.state.limit + this.state.next;
        this.setState({
          next: next
        });
      }
    };
  }

  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }

  showPositionsFromTo = (from, to) => {
    const positions = this.state.positions;
    const positionsToShow = this.state.positionsToShow;
    for (let i = from; i < to; i++) {
      if (positions[i] !== undefined) positionsToShow.push(positions[i]);
    }
    this.setState({ positionsToShow: positionsToShow });
  };

  loadPositions = () => {
    axios
      .get("/positions")
      .then(response => {
        const positionsToShow = [];
        for (let i = 0; i < this.state.limit; i++) {
          if (response.data[i] !== undefined)
            positionsToShow.push(response.data[i]);
        }
        this.setState({
          positions: response.data,
          positionsToShow: positionsToShow
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  alertHandler = (noError) => {
    this.setState({ succesAlert: true, noError: noError });
    setTimeout(() => {
      this.setState({ succesAlert: false });
    }, 2000);
  };

  render() {
    const alert = this.state.succesAlert;
    const noError = this.state.noError;
    let alertText = '';
    let alertColor = '';
    if(noError){
      alertText = 'Your application was sent successfully.';
      alertColor = 'success';
    }else{
      alertText = 'Oopss, something went wrong with the application. Please, try againg'
      alertColor = 'danger';
    }
    let alertMessage = null;
    if (alert) {
      alertMessage = (
        <Alert color={alertColor} className="float-right w-auto m-5 text-center">
          {alertText}
        </Alert>
      );
    }
    let positions;
    if (this.state.positions.length === 0) {
      positions = (
        <Container>
          <div className="fixed-top">{alertMessage}</div>
          <div className="header-body text-center mb-7">
            <Row className="justify-content-center">
              <Col lg="5" md="6">
                <h1 className="text-white">
                  Currently we do not have any position openings available.
                </h1>
              </Col>
            </Row>
          </div>
        </Container>
      );
    } else {
      positions = this.state.positionsToShow.map(position => {
        return (
          <Position
            id={`position-${position.id.toString()}`}
            key={position.id.toString()}
            position={position}
            alert={this.alertHandler}
          />
        );
      });
    }
    return (
      <Container className="bg-white rounded p-3">
        <div className="fixed-top">{alertMessage}</div>
        {positions}
      </Container>
    );
  }
}

export default CareerList;
