import React from "react";

import { Input, Col, FormGroup, InputGroup, Label, FormText } from "reactstrap";

const customInput = props => {
  let inputElement = null;
  switch (props.elementType) {
    case "input":
      inputElement = (
        <Input
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;

    case "textarea":
      inputElement = (
        <Input
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;

    case "select":
      inputElement = (
        <Input id={props.id} type={props.elementType} onChange={props.changed}>
          {props.elementConfig.options.map(options => (
            <option key={options.value} value={options.value}>
              {options.displayValue}
            </option>
          ))}
        </Input>
      );
      break;

    case "file":
      inputElement = (
        <FormGroup>
          <Label for={props.id}>{props.elementConfig.placeholder}</Label>
          <InputGroup className={props.elementConfig.inputGroup}>
            <Input
              {...props.elementConfig}
              id={props.id}
              value={props.value}
              onChange={props.changed}
              className="input-cursor-style"
            />
          </InputGroup>
          <FormText color="muted">
            Attach {props.elementConfig.placeholder} here.
          </FormText>
        </FormGroup>
      );
      break;

    default:
      inputElement = (
        <FormGroup>
          <InputGroup className={props.elementConfig.inputGroup}>
            <Input
              {...props.elementConfig}
              value={props.value}
              onChange={props.changed}
            />
          </InputGroup>
        </FormGroup>
      );
  }

  return (
    <Col>
      <FormGroup>
        <InputGroup className={props.elementConfig.inputgroup}>
          {inputElement}
        </InputGroup>
        <Label for={props.value}>
          <small className="text-muted">{props.elementConfig.labeltext}</small>
        </Label>
      </FormGroup>
    </Col>
  );
};

export default customInput;
