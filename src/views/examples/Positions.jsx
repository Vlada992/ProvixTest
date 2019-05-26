import React from "react";
import axios from "axios";
import moment from "moment";
import Modals from "./Form/Form";
import PositionList from "./PositionList";

// reactstrap components

import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";

class Positions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultModal: false,
      loadedData: null,
      sortBtns: "sort-btns-white",
      pageSize: 20,
      pagesCount: "",
      inputName: "",
      textDesc: "",
      startDate: "",
      endDate: "",
      toggleDatePick: false,
      successMessage: false,
      successMessageEdit: false,
      toggleSubmit: true,
      positionId: "",
      sorting:"asc",
      arrow:'▼'
    };
  }

  editPosition = (event, data) => {
    event.preventDefault();
    let startD = this.formatDate(data.startDate);
    let endD = this.formatDate(data.endDate);
    this.setState({
      toggleSubmit: false,
      inputName: data.name,
      textDesc: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      positionId: data.id,
      successMessage: false,
      successMessageEdit: false
    });
    this.toggleModal("formModal");
  };

  editPositionSubmit = e => {
    e.preventDefault();
    this.setState({
      successMessageEdit: true
    });
    const jwt = localStorage.getItem("jwt-token");
    const position = {
      name: this.state.inputName,
      description: this.state.textDesc,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    };
    this.putPosition(position, jwt);
    this.toggleModal("formModal");
  };

  submitPosition = e => {
    e.preventDefault();
    const jwt = localStorage.getItem("jwt-token");
    const position = {
      name: this.state.inputName,
      description: this.state.textDesc,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    };
    this.postPosition(position, jwt);
  };

  postPosition = (position, jwt) => {
    axios({
      method: "post",
      url: "/positions",
      data: position,
      headers: {
        Authorization: jwt
      }
    })
      .then(response => {
        const sts = response.status;
        if (sts > 200 && sts < 300) {
          this.toggleModal("formModal");
          this.setState({
            successMessage: true,
            inputName: "",
            textDesc: ""
          });
        }
      })
      .then(()=> {
        this.showRecords()
      })
      .catch(error => {
        console.log(error);
      });
  };

    showRecords = () => {
      axios.get(`/positions?sort=name,${this.state.sorting}`)
      .then(response => {
        const respData = response.data;
        const pgCount = Math.ceil(respData.length / this.state.pageSize);
        this.setState({
          loadedData: respData,
          pagesCount: pgCount
        });
      })
      .catch(error => {
        console.log(error);
      })
    };

  putPosition = (position, jwt) => {
    axios({
      method: "put",
      url: `/positions/${this.state.positionId}`,
      data: position,
      headers: {
        Authorization: jwt
      }
    })
      .then(response => {
        const sts = response.status;
        if (sts > 200 && sts < 300) {
          this.toggleModal("formModal");
          this.setState({
            successMessage: true,
            inputName: "",
            textDesc: ""
          });
        }
      })
      .then(() => {
        this.showRecords()
      })
      .catch(error => {
        console.log(error);
      });
  };

  toggleModal = (state, btnArg) => {
    if (btnArg) {
      this.setState({
        inputName: "",
        textDesc: "",
        startDate: "",
        endDate: ""
      });
    }

    if (btnArg === "Add") {
      this.setState({
        successMessage: false,
        successMessageEdit: false,
        toggleSubmit: true
      });
    }
    this.setState({
      [state]: !this.state[state]
    });
  };

  updateInput = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  updateInputDate = (e, nameArg) => {
    const { _d } = e;
    this.setState({
      [nameArg]: _d,
      toggleDatePick: true
    });
  };

  formatDate = date => {
    const format = "MMMM Do YYYY";
    return moment(date).format(format);
  };

  sortingNames = (sort, arrow) => {
    axios
    .get(`/positions/?sort=name,${sort}`)
    .then(response => {
      const respData = response.data;
      this.setState({
        loadedData: respData,
        sorting:sort,
        arrow:arrow
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  componentDidMount() {
      this.showRecords()
  }

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Row>
          <Col md="12">
            <PositionList
              states={this.state}
              formatDate={this.formatDate}
              toggleModal={this.toggleModal}
              submitForm={this.submitPosition}
              updateInput={this.updateInput}
              updateInputDate={this.updateInputDate}
              editPosition={this.editPosition}
              editPositionSubmit={this.editPositionSubmit}
              sortingAsc={this.sortingAsc}
              sortingDesc={this.sortingDesc}
              sortingNames={this.sortingNames}
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default Positions;
