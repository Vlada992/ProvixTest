import React from "react";
import PropTypes from "prop-types";

import ApplyForm from "../examples/ApplyForm";
import "./StyleHelpers/positionStyle.css";

// reactstrap components
import {
  Container,
  UncontrolledCollapse,
  Button,
  CardBody,
  CardText,
  Card,
  CardFooter,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import moment from "moment";

class Position extends React.Component {
  state = {
    modal: false
  };

  formatDate = date => {
    const format = "MMMM Do YYYY";
    return moment(date).format(format);
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  render() {
    const endDate = this.formatDate(this.props.position.endDate);
    console.log('propertiji:', this.props);
    return (
      <Container className="p-3 mb-3 bg-light text-dark rounded z-index-3 border-primary position-top-border">
        <h1 className="text-dark open-positions-h1" id={this.props.id}>
          {this.props.position.name}
        </h1>
        <UncontrolledCollapse toggler={`#${this.props.id}`}>
          <Card>
            <CardBody>
              <CardText>{this.props.position.description}</CardText>
              <div className="clearfix">
                <Button
                  className="btn float-right"
                  color="secondary"
                  onClick={this.toggle}
                >
                  Apply
                </Button>
                <Modal
                  isOpen={this.state.modal}
                  toggle={this.toggle}
                  className={this.props.className}
                >
                  <ModalHeader
                    toggle={this.toggle}
                    className="text-center bg-primary"
                  >
                    <p className="text-white display-4 m-0 p-0">
                      {this.props.position.name}
                    </p>
                  </ModalHeader>
                  <ModalBody>
                    <ApplyForm toggle={this.toggle} alert={this.props.alert} positionTitle={this.props.position.name} positionId={this.props.position.id} />
                  </ModalBody>
                </Modal>
              </div>
            </CardBody>
            <CardFooter>
              <div className="clearfix">
                <div className="float-left">
                  <h4>Apply until {endDate}.</h4>
                </div>
              </div>
            </CardFooter>
          </Card>
        </UncontrolledCollapse>
      </Container>
    );
  }
}

Position.propTypes = {
  position: PropTypes.shape({
    description: PropTypes.string,
    endDate: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
    startDate: PropTypes.string
  }),
  id: PropTypes.string
};

export default Position;
