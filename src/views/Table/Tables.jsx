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
      sortBtns: "sort-btns-white"
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

  render() {
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
                      </th>
                      <th>
                        Start date
                      </th>
                      <th>
                        End date
                      </th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.loadedData
                      ? this.state.loadedData
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
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Tables;
