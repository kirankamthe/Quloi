import moment from "moment";
import { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { addStudent, editStudent } from "../actions";

function AddEditModal(props) {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    class: "IX",
    birthDate: moment(new Date()).format("YYYY-MM-DD"),
    emailId: "",
    contactNo: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    documents: [],
  });

  const [isError, setError] = useState(false);

  const action = props.rowData.action;

  useEffect(() => {
    if ((props.rowData.data && action == "view") || action == "edit") {
      setFormData({
        name: props.rowData.data.name,
        gender: props.rowData.data.gender,
        class: props.rowData.data.class,
        birthDate: props.rowData.data.birthDate,
        emailId: props.rowData.data.emailId,
        contactNo: props.rowData.data.contactNo,
        street: props.rowData.data.street,
        city: props.rowData.data.city,
        state: props.rowData.data.state,
        country: props.rowData.data.country,
        zipcode: props.rowData.data.zipcode,
        documents: props.rowData.data.documents,
      });
    }
  }, [props.rowData.data || props.rowData.action]);

  useEffect(() => {
    if (!props.showModal) {
      props.handleModalClose();
      clearFormData()
    }
  }, [props.showModal]);

  const clearFormData = () => {
    setFormData({
      name: "",
      gender: "",
      class: "XI",
      birthDate: moment(new Date()).format("YYYY-MM-DD"),
      emailId: "",
      contactNo: "",
      street: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
      documents: [],
    });
  };

  //save entered value and handle error
  const handleChange = (e, label) => {
    if (
      (label == "contactNo" && e.target.value.length > 10) ||
      (label == "zipcode" && e.target.value.length > 6)
    ) {
      e.preventDefault();
    } else {
      let label = e.target.name;
      let value = e.target.value;
      formData[label] = value;
      setError(false);
      setFormData({ ...formData });
    }
  };

  const getFiles = (files) => {
    if (formData.documents.length) {
      formData.documents = [...formData.documents, files[0].base64];
    }
    formData.documents = [files[0].base64];
    setFormData({ ...formData });
  };

  //check title and description if available then submit ow show error message
  const handleSubmit = () => {
    if (validateForm()) {
      if (action == "edit") {
        formData._id = props.rowData.data._id;
        props.editStudent(formData);
      } else {
        formData._id = new Date().getTime();
        props.addStudent(formData);
      }
      props.handleModalClose();
      clearFormData();
    } else {
      setError(true);
    }
  };

  const validateForm = () => {
    let errorArePresent = false;
    if (formData.name == "") {
      errorArePresent = true;
    }
    if (formData.gender == "") {
      errorArePresent = true;
    }
    if (formData.birthDate == "") {
      errorArePresent = true;
    }
    if (formData.emailId == "") {
      errorArePresent = true;
    }
    if (formData.contactNo == "") {
      errorArePresent = true;
    }
    if (formData.country == "") {
      errorArePresent = true;
    }
    if (formData.state == "") {
      errorArePresent = true;
    }
    if (formData.city == "") {
      errorArePresent = true;
    }
    if (formData.zipcode == "") {
      errorArePresent = true;
    }
    if (formData.street == "") {
      errorArePresent = true;
    }
    return !errorArePresent;
  };

  return (
    <Modal
      size="lg"
      centered
      show={props.showModal}
      onHide={props.handleModalClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form style={{ pointerEvents: action == "view" ? "none" : "auto" }}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.gender}
                  className="mr-sm-2"
                  id="inlineFormCustomSelect"
                  custom
                  onChange={handleChange}
                  name="gender"
                >
                  <option value=""></option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">other</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Class</Form.Label>
                <Form.Control readOnly={true} value={formData.class} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>BirthDate</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="YYYY-MM-DD"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Email Id</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="email"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Contact No</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="contact no"
                  name="contactNo"
                  maxLength={10}
                  value={formData.contactNo}
                  onChange={(e) => handleChange(e, "contactNo")}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Label>Address</Form.Label>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Street</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.city}
                  className="mr-sm-2"
                  id="inlineFormCustomSelect"
                  custom
                  onChange={handleChange}
                  name="city"
                >
                  <option value=""></option>
                  <option value="Pune">Pune</option>
                  <option value="Mumbai">Mumbai</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>State</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.state}
                  className="mr-sm-2"
                  id="inlineFormCustomSelect"
                  custom
                  onChange={handleChange}
                  name="state"
                >
                  <option value=""></option>
                  <option value="Maharashtra">Maharashtra</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.country}
                  className="mr-sm-2"
                  id="inlineFormCustomSelect"
                  custom
                  onChange={handleChange}
                  name="country"
                >
                  <option value=""></option>
                  <option value="India">India</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.zipcode}
                  className="mr-sm-2"
                  onChange={(e) => handleChange(e, "zipcode")}
                  maxLength={6}
                  name="zipcode"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Upload Document Files</Form.Label>
              {"   "}
              <FileBase64 multiple={true} onDone={getFiles} />
            </Col>
          </Row>
        </Form>
        {isError && <div className="error">Please fill all fields</div>}
      </Modal.Body>
      {action == "view" ? null : (
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleModalClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { addStudent, editStudent })(
  AddEditModal
);
