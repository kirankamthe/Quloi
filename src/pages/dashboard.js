import React, { Component } from "react";
import moment from "moment";
import { Button, Col, Container, Form, Row, Navbar } from "react-bootstrap";
import { connect } from "react-redux";
import AddEditModal from "../components/AddEditModal";
import DataTable from "../components/DataTable";
import { signout } from "../actions";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studList: props.students,
      showModal: false,
      rowData: { action: "", data: [] },
      popupOpen: false,
      rowForDelete: [],
      fromDate: "",
      toDate: "",
      searchQuery: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      !prevState.searchQuery &&
      !prevState.fromDate &&
      !prevState.toDate &&
      nextProps?.students?.length > 0 &&
      prevState?.students?.length != nextProps?.students?.length
    ) {
      return {
        studList: nextProps.students,
      };
    }
    return null;
  }

  //close modal
  handleModalClose = () => {
    this.setState({ showModal: false, rowData: { action: "", data: [] } });
  };

  //show modal
  showModal = () => {
    this.setState({ showModal: true });
  };

  //show row data in modal
  handleRowClick = (row) => {
    this.setState(
      {
        rowData: {
          action: "view",
          data: row,
        },
      },
      () => {
        this.showModal();
      }
    );
  };

  //handle edit task
  handleEditClick = (row) => {
    this.setState(
      {
        rowData: {
          action: "edit",
          data: row,
        },
      },
      () => {
        this.showModal();
      }
    );
  };

  //calling on row header sort click
  handleSortData = (direction, sortKey) => {
    let sortData = this.state.studList.sort((a, b) => {
      a[sortKey] = a[sortKey] ? a[sortKey] : "";
      b[sortKey] = b[sortKey] ? b[sortKey] : "";
      //data sorting based on due and created date
      if (sortKey == "birthDate") {
        if (direction == "ascending") {
          return new Date(a[sortKey]) - new Date(b[sortKey]);
        } else {
          return new Date(b[sortKey]) - new Date(a[sortKey]);
        }
      } else {
        //otherthan duedate columns data sorting
        if (direction == "ascending") {
          if (a[sortKey].toUpperCase() > b[sortKey].toUpperCase()) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (a[sortKey].toUpperCase() < b[sortKey].toUpperCase()) {
            return 1;
          } else {
            return -1;
          }
        }
      }
    });
    this.setState({ studList: sortData });
  };

  //seach in todo list
  handleSearch = (e) => {
    e.preventDefault();
    let { students } = this.props;
    const searchableColumns = [
      "name",
      "gender",
      "class",
      "birthDate",
      "emailId",
      "contactNo",
      "street",
      "country",
      "zipcode",
      "city",
      "state",
    ];
    let query = e.target.value;
    this.setState({ searchQuery: query });
    let searchList = [];

    if (students && students.length) {
      searchList = students.filter((row) =>
        searchableColumns.some(
          (column) =>
            row[column].toString().toLowerCase().indexOf(query.toLowerCase()) >
            -1
        )
      );
    }
    this.setState({ studList: query ? searchList : students });
  };

  handleFilterDateChange = (e) => {
    let label = e.target.name;
    let value = e.target.value;
    if (label == "fromDate") {
      this.state.fromDate = value;
    } else {
      this.state.toDate = value;
    }
    this.setState(
      { fromDate: this.state.fromDate, toDate: this.state.toDate },
      () => {
        this.filterDateData();
      }
    );
  };

  filterDateData = () => {
    let { fromDate, toDate, studList } = this.state;
    this.setState({ searchQuery: "" });
    if (fromDate && toDate) {
      let startDate = moment(fromDate).format("YYYY-MM-DD");
      let endDate = moment(toDate).format("YYYY-MM-DD");

      let resultProductData = studList.filter(function (a) {
        return a.birthDate >= startDate && a.birthDate <= endDate;
      });
      this.setState({ studList: resultProductData });
    } else {
      this.setState({ studList });
    }
  };

  clearData = () => {
    this.setState({ fromDate: "", toDate: "", searchQuery: "" });
  };

  render() {
    let { showModal, studList, rowData } = this.state;
    return (
      <div>
        <Container>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand>
              {this.props?.user?.isAdmin ? "Admin Portal" : "Student Portal"}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Form inline style={{ marginLeft: "auto" }}>
                <Button variant="outline-success" onClick={this.props.signout}>
                  Log Out
                </Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
          <br />
          {this.props?.user?.isAdmin && (
            <>
              <Button className="add-btn" onClick={this.showModal}>
                <span>Add Student</span>
              </Button>
              <br />
            </>
          )}
          <Row>
            <Col md={4}>
              <Form.Label>Search</Form.Label>
              <Form.Control
                placeholder="Search..."
                onChange={this.handleSearch}
              />
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Filter by Date</Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      type="date"
                      placeholder="YYYY-MM-DD"
                      name="fromDate"
                      value={this.state.fromDate}
                      onChange={this.handleFilterDateChange}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="date"
                      placeholder="YYYY-MM-DD"
                      name="toDate"
                      value={this.state.toDate}
                      onChange={this.handleFilterDateChange}
                    />
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <button onClick={this.clearData}>Clear</button>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
          <br />
          {studList.length ? (
            <DataTable
              user={this.props.user}
              items={this.state.studList}
              handleSortData={this.handleSortData}
              handleRowClick={this.handleRowClick}
              handleEditClick={this.handleEditClick}
            />
          ) : (
            <Row style={{ justifyContent: "center", marginTop: "2em" }}>
              <div>Data not found</div>
            </Row>
          )}
        </Container>
        <AddEditModal
          rowData={rowData}
          showModal={showModal}
          handleModalClose={this.handleModalClose}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  students: state.students,
  user: state.user,
});

export default connect(mapStateToProps, { signout })(Dashboard);
