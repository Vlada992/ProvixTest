import React from "react";
import ReactDatetime from "react-datetime";
import "./Form.css";
import axios from "axios";
import Header from "components/Headers/Header.jsx";

import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Row,
  Col
} from "reactstrap";

class Modals extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {this.props.states.successMessage ? (
          <Alert color="success">Position was added</Alert>
        ) : null}

        {this.props.states.successMessageEdit ? (
          <Alert color="info">Position was updated</Alert>
        ) : null}

        <Button
          className="btn-neutral btn-icon mr-4"
          color="default"
          type="button"
          onClick={() => this.props.toggleModal("formModal", "Add")}
        >
          ADD
        </Button>

        <Modal
          className="modal-dialog-centered"
          size="sm"
          isOpen={this.props.states.formModal}
          toggle={() => this.props.toggleModal("formModal")}
        >
          <div className="modal-body p-0">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent pb-5">
                <div className="text-muted text-center mt-2 mb-3">
                  {this.props.states.toggleSubmit ? (
                    <p className="font-weight-bold">Add a position</p>
                  ) : (
                    <p className="font-weight-bold">Edit a position</p>
                  )}
                </div>
              </CardHeader>

              <CardBody className="px-lg-5 py-lg-5">
                <Form
                  role="form"
                  id="submit-form"
                  onSubmit={
                    this.props.states.toggleSubmit
                      ? this.props.submitForm
                      : this.props.editPositionSubmit
                  }
                >
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <Input
                        name="inputName"
                        value={this.props.states.inputName}
                        onChange={this.props.updateInput}
                        placeholder="Name"
                        type="text"
                        required
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <textarea
                        name="textDesc"
                        value={this.props.states.textDesc}
                        onChange={this.props.updateInput}
                        placeholder="Description"
                        cols="60"
                        required
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-calendar-grid-58" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <ReactDatetime
                        inputProps={{
                          name: "startDate",
                          placeholder: "Start Date",
                          required: true
                        }}
                        value={this.props.states.startDate}
                        timeFormat={false}
                        onChange={e =>
                          this.props.updateInputDate(e, "startDate")
                        }
                        closeOnSelect={this.props.states.toggleDatePick}
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-calendar-grid-58" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <ReactDatetime
                        inputProps={{
                          name: "endDate",
                          placeholder: "End Date",
                          required: true
                        }}
                        value={this.props.states.endDate}
                        timeFormat={false}
                        onChange={e => this.props.updateInputDate(e, "endDate")}
                        closeOnSelect={this.props.states.toggleDatePick}
                      />
                    </InputGroup>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </div>

          <div className="modal-footer">
            <Button color="success" type="submit" form="submit-form" name="Add">
              Save
            </Button>
            <Button
              className="ml-auto"
              color="danger"
              data-dismiss="modal"
              type="button"
              onClick={() => this.props.toggleModal("formModal", "Cancel")}
            >
              Cancel
            </Button>
          </div>
        </Modal>
      </>
    );
  }
}

export default Modals;
