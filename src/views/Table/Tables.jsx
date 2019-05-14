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
    this.pagesCount = ''

    this.state = {
      loadedData: null,
      sortBtns: "sort-btns-white",
      currentPage: 0
    };
  }

  componentDidMount() {
      axios.get("http://136ea.k.time4vps.cloud:9090/api/v1/positions")
      .then(response => {
        const respData = response.data;
        this.pagesCount = Math.ceil(respData.length / this.pageSize);
        this.setState({ loadedData: respData });
      })
      .catch(error => {
        console.log(error);
      });
  }

  sortUsers = (sortOpt, name) => {
    if (this.state.loadedData !== null) {
      let positionArray = [...this.state.loadedData];
    }
  };

  handleClick = (e, index) => {
    e.preventDefault();
    this.setState({ previousInd: index });
    this.setState({
      currentPage: index
    })
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
                            let startDt = new Date(data.startDate);
                            let endDt = new Date(data.endDate);
                            let startDateFormatted =
                              ("0" + (startDt.getMonth() + 1)).slice(-2) +
                              "/" +
                              ("0" + startDt.getDate()).slice(-2) +
                              "/" +
                              String(startDt.getFullYear()).slice(2) +
                              " " +
                              ("0" + startDt.getHours()).slice(-2) +
                              ":" +
                              ("0" + startDt.getMinutes()).slice(-2);
                            let endDateFormatted =
                              ("0" + (endDt.getMonth() + 1)).slice(-2) +
                              "/" +
                              ("0" + endDt.getDate()).slice(-2) +
                              "/" +
                              String(endDt.getFullYear()).slice(2) +
                              " " +
                              ("0" + endDt.getHours()).slice(-2) +
                              ":" +
                              ("0" + endDt.getMinutes()).slice(-2);
                            this.startDateSortedArr.push(startDateFormatted);
                            this.endDateSortedArr.push(endDateFormatted);

                            return (
                              <tr key={ind}>
                                <td >
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        {data.name}
                                      </span>
                                    </Media>
                                  </Media>
                                </td>

                                <td>
                                  {this.startDateSortedArr.length > 1
                                    ? this.startDateSortedArr[ind]
                                    : startDateFormatted}
                                </td>

                                <td>
                                  {this.endDateSortedArr.length > 1
                                    ? this.endDateSortedArr[ind]
                                    : endDateFormatted}
                                </td>

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
