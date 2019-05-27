


import React from "react";
import axios from "axios";
import moment from "moment";
import Form from "./Form/Form";

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
  UncontrolledTooltip
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
//Statefull component

class Positions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('propertiji:', this.props);
    const { currentPage } = this.props.states
    console.log(currentPage)

    
     console.log('vrednosti API responseA:', this.props.states.loadedData)
    
    
      
    

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
                  <h3 className="mb-0">Positions</h3>
                  <h3>
                    <Form
                      states={this.props.states}
                      formatDate={this.props.formatDate}
                      toggleModal={this.props.toggleModal}
                      submitForm={this.props.submitForm}
                      updateInput={this.props.updateInput}
                      updateInputDate={this.props.updateInputDate}
                      editPosition={this.props.editPosition}
                      editPositionSubmit={this.props.editPositionSubmit}
                    />
                  </h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                    <tr>
                      <th scope="col">Name
                      <Button 
                      color='link' 
                      onClick={this.props.states.sorting == 'asc' ? () => this.props.sortingNames('desc', false) : () => this.props.sortingNames('asc', false)}>{this.props.states.arrow ? '▲'  : '▼'}</Button>
                      </th>
                      <th scope="col">Start date</th>
                      <th scope="col">End date</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.props.states.loadedData
                      ? this.props.states.loadedData.slice(
                        currentPage * this.props.states.pageSize,  
                        (currentPage + 1) * this.props.states.pageSize
                      ).map((data, ind) => {
                          const startDate = this.props.formatDate(
                            data.startDate
                          );
                          const endDate = this.props.formatDate(data.endDate);
                          return (
                            <tr key={data.id}>
                              <td>
                                <Media className="align-items-center">
                                  <Media>
                                    <span className="mb-0 text-sm">
                                      {data.name}
                                    </span>
                                  </Media>
                                </Media>
                              </td>

                              <td>{startDate}</td>
                              <td>{endDate}</td>

                              <td>
                                <Button
                                  color="info"
                                  type="button"
                                  name="Edit"
                                  onClick={e =>
                                    this.props.editPosition(e, data)
                                  }
                                >
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
                <select>
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="vw">VW</option>
  <option value="audi" selected>Audi</option>
</select>
                  <nav aria-label="...">
                       <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem 
                      disabled={currentPage <= 0}
                      >
                        <PaginationLink
                          href="#"
                          onClick={e => this.props.handleClick(e, currentPage - 1)}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>

                      {[...Array(this.props.states.pagesCount)].map((page, i, arr) => (
                       /*i == 0 || i == (arr.length - 1) ? */
                        <PaginationItem active={i === currentPage} key={i}>
                          <PaginationLink
                            href="#"
                            onClick={e => this.props.handleClick(e, i)}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>  
                        /*</nav>:  null*/                       
                      ))}

                      

                       

                      {/*<PaginationItem className="active">
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
                      </PaginationItem>*/}

                      <PaginationItem
                        disabled={currentPage >= this.props.states.pagesCount - 1}
                      >
                        <PaginationLink
                          href=""
                          onClick={e => this.props.handleClick(e, currentPage + 1)}
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

export default Positions;


