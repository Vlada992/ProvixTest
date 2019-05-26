import React from "react";

// reactstrap components
import { Card, CardBody, Form, Col, Button } from "reactstrap";

import CustomInput from "../examples/CustomInput";
import axios from "axios";

class ApplyForm extends React.Component {
  state = {
    applyForm: {
      name: {
        elementType: "input",
        elementConfig: {
          inputgroup: "input-group-alternative",
          type: "text",
          placeholder: "Full Name",
          pattern: "[A-Za-z\\s]{3,}",
          required: true,
          labeltext: "Enter your full name "
        },
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          inputgroup: "input-group-alternative",
          type: "email",
          name: "email",
          placeholder: "Email",
          pattern: `[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,10}$`,
          required: true,
          labeltext: "Enter your email "
        },
        value: ""
      },
      phone: {
        elementType: "input",
        elementConfig: {
          inputgroup: "input-group-alternative",
          type: "text",
          placeholder: "Phone Number",
          required: true,
          labeltext: "Enter your phone number "
        },
        value: ""
      },
      education: {
        elementType: "select",
        elementConfig: {
          inputgroup: "input-group-alternative",
          options: [
            { value: "associate", displayValue: "Associate" },
            { value: "bachelor", displayValue: "Bachelor" },
            { value: "master", displayValue: "Master" },
            { value: "doctorate", displayValue: "Doctorate" },
            { value: "Other", displayValue: "Other" }
          ],
          labeltext: "Select your level of education"
        },
        value: "associate"
      } //,
      // cvUpload: {
      //   elementType: "file",
      //   elementConfig: {
      //     inputgroup: "input-group-alternative",
      //     type: "file",
      //     placeholder: "Your CV",
      //     required: true
      //   },
      //   value: [],
      //   files: []
      // },
      // otherFileUpload: {
      //   elementType: "file",
      //   elementConfig: {
      //     inputgroup: "input-group-alternative",
      //     type: "file",
      //     placeholder: "Other files",
      //     name: "file[]",
      //     multiple: true
      //   },
      //   value: [],
      //   files: []
      // }
    }
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedApplicationForm = {
      ...this.state.applyForm
    };
    const updatedFormElement = {
      ...updatedApplicationForm[inputIdentifier]
    };
    // if (
    //   event.target.id === "otherFileUpload" ||
    //   event.target.id === "cvUpload"
    // ) {
    //   updatedFormElement.files = Array.from(event.target.files);
    //   updatedFormElement.value = updatedFormElement.files;
    // }
    updatedFormElement.value = event.target.value;
    updatedApplicationForm[inputIdentifier] = updatedFormElement;
    this.setState({ applyForm: updatedApplicationForm });
  };

  applySubmitHandle = e => {
    e.preventDefault();
    const formElementsArray = this.getInputs();
    const applicant = this.prepareDataForPost(formElementsArray);
    this.apply(applicant);
  };

  getInputs = () => {
    const formElementsArray = [];
    for (let key in this.state.applyForm) {
      formElementsArray.push({
        id: key,
        config: this.state.applyForm[key]
      });
    }
    return formElementsArray;
  };

  prepareDataForPost = data => {
    const applicantData = {
      name: "",
      email: "",
      phone: "",
      education: "",
      comments: "",
      positionId: this.props.positionId,
      position: this.props.positionTitle
    };
    for (let key in data) {
      // if (data[key].id === "otherFileUpload" || data[key].id === "cvUpload") {
      //   applicantData[data[key].id] = data[key].config.files;
      // } else {
      applicantData[data[key].id] = data[key].config.value;
      //      }
    }
    return applicantData;
  };

  apply = applicant => {
    axios
      .post("/applicants", applicant)
      .then(response => {
          this.props.toggle(true);
          this.props.alert(true);
      })
      .catch(error => {
        console.log(error);
        this.props.toggle(false);
        this.props.alert(false);
      });
  };

  render() {
    const formElementsArray = this.getInputs();

    let form = (
      <Form role="form" onSubmit={this.applySubmitHandle}>
        {formElementsArray.map(formElement => (
          <CustomInput
            key={formElement.id}
            id={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <div className="text-center pt-2">
          <Button className="w-75 h-50 p-1 m-1" color="primary" type="submit">
            Apply
          </Button>
          <Button
            className="w-75 h-50 p-1 m-1"
            color="secondary"
            onClick={this.props.toggle}
          >
            Cancel
          </Button>
        </div>
      </Form>
    );

    return (
      <Col>
        <Card className="bg-secondary shadow border-0 w-100">
          <CardBody>{form}</CardBody>
        </Card>
      </Col>
    );
  }
}

export default ApplyForm;
