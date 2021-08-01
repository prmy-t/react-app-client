import { Card, Row, Col } from "react-bootstrap";
const AppointmentCard = (props) => {
  return (
    <Card className="my-1 p-2">
      <Card.Title>{props.appo.serviceType}</Card.Title>
      <Card.Body>
        <Row>
          <Col lg="6" md="6" sm="6" xs="12">
            <b>Name: </b> {props.appo.name}
            <br />
            <b>Contact: </b> {props.appo.contact}
            <br />
            <b>Date: </b>
            {props.appo.date}
            <br />
          </Col>
          <Col lg="6" md="6" sm="6" xs="12">
            <b>Vehicle type: </b> {props.appo.vehicleType}
            <br />
            <b>Engine type: </b> {props.appo.engineType}
            <br />
            <b>Description: </b>{" "}
            <div className="text-justify">{props.appo.description}</div>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col lg="2" md="12" sm="12" xs="12">
            Status:
          </Col>
          <Col
            className={
              props.appo.status === "Booked"
                ? "font-weight-bold text-success"
                : "text-muted"
            }
            lg="2"
            md="6"
            sm="6"
            xs="6"
          >
            Booked
          </Col>
          <Col
            className={
              props.appo.status === "In Service"
                ? "font-weight-bold text-success"
                : "text-muted"
            }
            lg="2"
            md="6"
            sm="6"
            xs="6"
          >
            In Service
          </Col>

          <Col
            className={
              props.appo.status === "Fixed / Completed"
                ? "font-weight-bold text-success"
                : "text-muted"
            }
            lg="2"
            md="6"
            sm="6"
            xs="6"
          >
            Fixed / Completed
          </Col>
          <Col
            className={
              props.appo.status === "Collected"
                ? "font-weight-bold text-success"
                : "text-muted"
            }
            lg="2"
            md="6"
            sm="6"
            xs="6"
          >
            Collected
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default AppointmentCard;
