import { Card, Row, Col } from "react-bootstrap";
const AppointmentCard = (props) => {
  return (
    <Card className="my-1 p-2">
      <Card.Title>{props.serviceType}</Card.Title>
      <Card.Body>
        <Row>
          <Col lg="6" md="6" sm="6" xs="12">
            <b>Name: </b> {props.name}
            <br />
            <b>Contact: </b> {props.contact}
            <br />
            <b>Date: </b>
            {props.date}
            <br />
          </Col>
          <Col lg="6" md="6" sm="6" xs="12">
            <b>Vehicle type: </b> {props.vehicleType}
            <br />
            <b>Engine type: </b> {props.engineType}
            <br />
            <b>Description: </b>{" "}
            <div className="text-justify">{props.description}</div>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col lg="2" md="12" sm="12" xs="12">
            Status:
          </Col>
          <Col
            className={true ? "font-weight-bold text-success" : ""}
            lg="2"
            md="6"
            sm="6"
            xs="6"
          >
            Booked
          </Col>
          <Col className={true ? "text-muted" : ""} lg="2" md="6" sm="6" xs="6">
            In Service
          </Col>

          <Col className={true ? "text-muted" : ""} lg="2" md="6" sm="6" xs="6">
            Fixed / Completed
          </Col>
          <Col className={true ? "text-muted" : ""} lg="2" md="6" sm="6" xs="6">
            Collected
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default AppointmentCard;
