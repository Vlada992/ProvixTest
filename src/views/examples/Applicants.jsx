import React from "react";
import axios from "axios";
import moment from "moment";

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";

class Applicants extends React.PureComponent {
  state = {
    loadedData: null,
    positions: null
  };

  componentWillMount() {
    axios
      .get("/positions")
      .then(response => {
        const respData = response.data;
        this.setState({
          positions: respData
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    const jwt = localStorage.getItem("jwt-token");
    const config = {
      headers: { Authorization: jwt }
    };
    axios
      .get("/applicants", config)
      .then(response => {
        const respData = response.data;
        this.setState({
          loadedData: respData
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  formatDate = date => {
    const format = "MMMM Do YYYY";
    return moment(date).format(format);
  };

  getPositionName = id => {
    let title = null;
    this.state.positions.map(data => {
      if (data.id === id) {
        return (title = data.name);
      } else {
        return null;
      }
    });
    return title;
  };


  // e.target.value is witch dropdown item is clicked and id is id of the applicant
  handleDropdown = (e, id) => {
    e.preventDefault();
  };

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Applicants</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Position</th>
                      <th scope="col">Name</th>
                      <th scope="col">Applied On</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.loadedData
                      ? this.state.loadedData.map((data, ind) => {
                          const dateApplied = this.formatDate(data.dateTime);
                          const title = this.getPositionName(data.positionId);
                          return (
                            <tr key={data.id}>
                              <td>
                                <Media className="align-items-center">
                                  <Media>
                                    <span className="mb-0 text-sm">
                                      {data.id}
                                    </span>
                                  </Media>
                                </Media>
                              </td>
                              <td>
                                <Media className="align-items-center">
                                  <Media>
                                    <span className="mb-0 text-sm">
                                      {title}
                                    </span>
                                  </Media>
                                </Media>
                              </td>
                              <td>
                                <Media className="align-items-center">
                                  <Media>
                                    <span className="mb-0 text-sm">
                                      {data.name}
                                    </span>
                                  </Media>
                                </Media>
                              </td>
                              <td>
                                <Media className="align-items-center">
                                  <Media>
                                    <span className="mb-0 text-sm">
                                      {dateApplied}
                                    </span>
                                  </Media>
                                </Media>
                              </td>
                              <td>
                                <Media className="align-items-center">
                                  <Media>
                                    <span className="mb-0 text-sm">
                                      {data.applicantStatus}
                                    </span>
                                  </Media>
                                </Media>
                              </td>
                              <td>
                                <Media className="align-items-center ">
                                  <Media>
                                    <span className="mb-0 text-sm">
                                      <UncontrolledButtonDropdown>
                                        <DropdownToggle>
                                          <i className="ni ni-bold-down" />
                                        </DropdownToggle>
                                        <DropdownMenu
                                          className="text-center"
                                          right
                                        >
                                          <DropdownItem
                                            onClick={e =>
                                              this.handleDropdown(e, data.id)
                                            }
                                            className="text-info"
                                            value="preview"
                                          >
                                            Preview
                                          </DropdownItem>
                                          <DropdownItem divider />
                                          <DropdownItem
                                            onClick={e =>
                                              this.handleDropdown(e, data.id)
                                            }
                                            className="text-success"
                                            value="accept"
                                          >
                                            Accept
                                          </DropdownItem>
                                          <DropdownItem divider />
                                          <DropdownItem
                                            onClick={e =>
                                              this.handleDropdown(e, data.id)
                                            }
                                            className="text-danger"
                                            value="reject"
                                          >
                                            Reject
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </UncontrolledButtonDropdown>
                                    </span>
                                  </Media>
                                </Media>
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Applicants;
