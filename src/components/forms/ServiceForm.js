import { useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  InputGroup,
  FormControl,
  Spinner,
} from "react-bootstrap";
import {
  FaUserAlt,
  FaRegAddressBook,
  FaCarSide,
  FaSun,
  FaAngleRight,
  FaFileAlt,
} from "react-icons/fa";
import { useSelector } from "react-redux";
//component imports
import Field from "./Field";
import AnAlert from "../UI/AnAlert";
const ServiceForm = () => {
  const params = useParams();
  const history = useHistory();

  const user = useSelector((state) => state.user);
  const serviceType = params.serviceName.split("-").join(" ");

  const [full, setFull] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [engineType, setEngineType] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [validation, setValidation] = useState(false);

  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const contactHandler = (e) => {
    setContact(e.target.value);
  };
  const vehicleHandler = (e) => {
    setVehicleType(e.target.value);
  };
  const engineHandler = (e) => {
    setEngineType(e.target.value);
  };
  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };
  const dateHandler = (e) => {
    setDate(e.target.value);
  };
  const checkDate = async () => {
    const email = user.email;
    if (name && date && vehicleType && engineType && description) {
      setIsLoading(true);
      setValidation(false);
      const res = await axios.post("http://localhost:3000/create-appointment", {
        name,
        email,
        contact,
        serviceType,
        vehicleType,
        engineType,
        description,
        date,
      });
      console.log(res.data);
      if (res.data.success === "appointment created") {
        history.push("/account");
      } else {
        setIsLoading(false);
        setFull(true);
        setError(res.data.error);
      }
    } else setValidation(true);
  };

  return (
    <Container className="m-2">
      <Row>
        <Col>
          <Card bg="light" className="p-3">
            <Card.Title>Customers Details</Card.Title>
            <Form>
              <Card.Body>
                <Row className="justify-content-center mt-2">
                  <Col lg="5">
                    <Field
                      children={<FaUserAlt />}
                      handler={nameHandler}
                      placeholder="Enter your name"
                    />
                  </Col>

                  <Col lg="5">
                    <Field
                      children={<FaRegAddressBook />}
                      handler={contactHandler}
                      placeholder="Enter contact number"
                    />
                  </Col>
                </Row>
                <Row className="justify-content-center my-2">
                  <Col lg="5">
                    <Field
                      children={<FaCarSide />}
                      handler={vehicleHandler}
                      placeholder="Enter vehicle type"
                    />
                  </Col>

                  <Col lg="5">
                    <Field
                      children={<FaSun />}
                      handler={engineHandler}
                      placeholder="Enter engine type"
                    />
                  </Col>
                </Row>
                <Row className="justify-content-center my-1">
                  <Col lg="8">
                    <InputGroup>
                      <InputGroup.Text>
                        <FaFileAlt />
                      </InputGroup.Text>
                      <FormControl
                        onChange={descriptionHandler}
                        as="textarea"
                        placeholder="Enter Description"
                      ></FormControl>
                    </InputGroup>
                  </Col>
                </Row>
              </Card.Body>
            </Form>
          </Card>
        </Col>
      </Row>

      <Row className="my-2 justify-content-center">
        <Col>
          <Card bg="light" className="p-3">
            <Card.Title>Select an Appointment</Card.Title>
            <Card.Body>
              <Form.Group controlId="doo">
                <Form.Label>Select Date</Form.Label>
                <Form.Control
                  onChange={dateHandler}
                  type="date"
                  ud="date-picker"
                  name="doo"
                  placeholder="Date of Appointment"
                />
                <Form.Text id="date-picker" muted>
                  There are only 4 Available places one a single day.
                </Form.Text>
              </Form.Group>
            </Card.Body>
            <Row className="justify-content-between">
              <Col lg="8" md="8" sm="8" xs="12">
                <AnAlert
                  show={full}
                  variant="danger"
                  onClose={() => setFull(false)}
                  heading={error}
                />
              </Col>
              <Col lg="8" md="8" sm="8" xs="12">
                <AnAlert
                  size="sm"
                  show={validation}
                  variant="info"
                  onClose={() => setValidation(false)}
                  heading="All fields are required."
                />
              </Col>
              <Col className="text-center" lg="3" md="3" sm="3" xs="4">
                <Button
                  disabled={isLoading}
                  onClick={isLoading ? null : checkDate}
                  variant="outline-info"
                >
                  {isLoading ? (
                    <Spinner size="sm" animation="border" />
                  ) : (
                    "Next"
                  )}
                  {!isLoading && <FaAngleRight />}
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ServiceForm;
