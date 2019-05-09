import React from "react";
import axios from "axios";
import './Tables.css';

// reactstrap components
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
    console.log("creation phase [constructor] [FIRST CALLED] -1");
    super(props);
    this.state = {
      loadedData: null,
      sortBtns: 'sort-btns-white'
    };
  }


  componentDidMount() {
    console.log("creation phase [componentDidMount] [FOURTH CALLED] -4");
    axios
      .get("http://localhost:3004/posts")
      .then(response => {
        console.log("RESPONSE from GET request:", response);
        const respData = response.data.slice(0, 20);
        this.setState({ loadedData: respData });
      })
      .catch(error => {
        console.log(error);
      });
  };

   sortUsers = (sortOpt, title) => {
    if (this.state.loadedData !== null) {
        let positionArray =  [...this.state.loadedData];
        positionArray.sort((a, b) => {
            if(sortOpt === 1){
                return a[title] === b[title] ? 0 : a[title] < b[title] ? -1 : 1;
            } 
                return a[title] === b[title] ? 0 : a[title] > b[title] ? -1 : 1;
        })

        this.setState({
          loadedData: positionArray,
          sortBtns:'sort-btns-red'
         })
      }
    };


  clickPage1 = () => {
    console.log('page one clicked!')
  } //strana 1



  render() {
    return (
      <>
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Positions</h3>
                </CardHeader>

                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr className='tr-heading'>
                      <th scope="col">
                        Title
                        <button
                          className={this.state.sortBtns}
                          onClick={() => this.sortUsers(1, 'title')}
                        >
                          ▲
                        </button>
                        <button
                          className={this.state.sortBtns}
                          onClick={() => this.sortUsers(0, 'title')}
                        >
                          ▼
                        </button>
                      </th>

                      <th>Start date</th>
                      <th>End date</th>

                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.loadedData
                      ? this.state.loadedData.map((data, ind) => (

                          <tr key={ind}>
                            <th className='t-header' scope="row">
                              <Media className="align-items-center">
                                <Media>
                                  <span className="mb-0 text-sm">
                                    {data.title}
                                  </span>
                                </Media>
                              </Media>
                            </th>

                            <td>
                            {data.id}
                            </td>

                            <td>
                            {data.id + ind}
                            </td>

                            <td>
                              <Button  
                              color="info" 
                              type="button">
                                Edit
                              </Button>
                              <Button 
                              color="danger" 
                              type="button">
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))
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
                          onClick={() => this.clickPage1()}
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

          {/* Dark table */}
        </Container>
      </>
    );
  }
}

export default Tables;
