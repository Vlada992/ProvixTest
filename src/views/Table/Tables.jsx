import React from "react";
import axios from "axios";
import "./Tables.css";

import {
  Button,
  Card,
  CardHeader,
  CardFooter,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row
} from "reactstrap";

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.startDateSortedArr = [];
    this.endDateSortedArr = [];
    this.pageSize = 20;
    this.pagesCount = "";

    this.state = {
      loadedData: null,
      sortBtns: "sort-btns-white",
      currentPage: 0
    };
  }

  componentDidMount() {
    axios
      .get("http://136ea.k.time4vps.cloud:9090/api/v1/positions")
      .then(response => {
        const respData = response.data;
        this.pagesCount = Math.ceil(respData.length / this.pageSize);
        this.setState({ loadedData: respData });
      })
      .catch(error => {
        console.log(error);
      });
  }

  sortUsers = (ascending, name) => {
    if (this.state.loadedData !== null) {
      let positionArray = [...this.state.loadedData];
      let startDtA, startDtB, endDtA, endDtB;

      positionArray.sort((a, b) => {
        startDtA = String(a.startDate)
          .slice(0, -5)
          .split("T")
          .join(" ");
        startDtB = String(b.startDate)
          .slice(0, -5)
          .split("T")
          .join(" ");
        endDtA = String(a.endDate)
          .slice(0, -5)
          .split("T")
          .join(" ");
        endDtB = String(b.endDate)
          .slice(0, -5)
          .split("T")
          .join(" ");

        if (name == "name") {
          if (ascending) {
            return a[name] === b[name] ? 0 : a[name] < b[name] ? -1 : 1;
          }
          return a[name] === b[name] ? 0 : a[name] > b[name] ? -1 : 1;
        } else if (name == "start") {
          if (ascending) {
            return new Date(startDtA) - new Date(startDtB);
          }
            return new Date(startDtB) - new Date(startDtA);
        } else if (name == "end") {
          if (ascending) {
            return new Date(endDtA) - new Date(endDtB);
          } 
            return new Date(endDtB) - new Date(endDtA);
        }
      });

      this.setState({
        loadedData: positionArray
      });
    }
  };

  handleClick = (e, index) => {
    e.preventDefault();
    this.setState({ previousInd: index });
    this.setState({
      currentPage: index
    });
  };

  render() {
    const { currentPage } = this.state;
    return (
      <>
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Positions</h3>
                </CardHeader>

                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr className="tr-heading">
                      <th scope="col">
                        name
                        <button
                          className={this.state.sortBtns}
                          onClick={() => this.sortUsers(1, "name")}
                        >
                          ▲
                        </button>
                        <button
                          className={this.state.sortBtns}
                          onClick={() => this.sortUsers(0, "name")}
                        >
                          ▼
                        </button>
                      </th>

                      <th>
                        Start date
                        <button
                          className={this.state.sortBtns}
                          onClick={() => this.sortUsers(1, "start")}
                        >
                          ▲
                        </button>
                        <button
                          className={this.state.sortBtns}
                          onClick={() => this.sortUsers(0, "start")}
                        >
                          ▼
                        </button>
                      </th>

                      <th>
                        End date
                        <button
                          className={this.state.sortBtns}
                          onClick={() => this.sortUsers(1, "end")}
                        >
                          ▲
                        </button>
                        <button
                          className={this.state.sortBtns}
                          onClick={() => this.sortUsers(0, "end")}
                        >
                          ▼
                        </button>
                      </th>

                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.loadedData
                      ? this.state.loadedData
                          .slice(
                            currentPage * this.pageSize,
                            (currentPage + 1) * this.pageSize
                          )
                          .map((data, ind) => {
                            var startD = String(data.startDate)
                              .slice(0, -5)
                              .split("T")
                              .join(" ");
                            var endD = String(data.endDate)
                              .slice(0, -5)
                              .split("T")
                              .join(" ");

                            return (
                              <tr key={ind}>
                                <td>
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        {data.name}
                                      </span>
                                    </Media>
                                  </Media>
                                </td>

                                <td>{startD}</td>

                                <td>{endD}</td>

                                <td>
                                  <Button color="info" type="button">
                                    Edit
                                  </Button>
                                  <Button color="danger" type="button">
                                    Delete
                                  </Button>
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
                      <PaginationItem disabled={currentPage <= 0}>
                        <PaginationLink
                          href="#"
                          previous
                          onClick={e => this.handleClick(e, currentPage - 1)}
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>

                      {[...Array(this.pagesCount)].map((page, i) => (
                        <PaginationItem active={i === currentPage} key={i}>
                          <PaginationLink
                            href="#"
                            onClick={e => this.handleClick(e, i)}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem
                        disabled={currentPage >= this.pagesCount - 1}
                      >
                        <PaginationLink
                          href=""
                          onClick={e => this.handleClick(e, currentPage + 1)}
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

export default Tables;
