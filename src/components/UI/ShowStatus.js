import { Row, Col } from "react-bootstrap";

export default function ShowStatus(props) {
  return (
    <Row className="mt-2">
      <Col lg="2" md="12" sm="12" xs="12">
        Status:
      </Col>
      <Col
        className={
          props.status === "Booked"
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
          props.status === "In Service"
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
          props.status === "Fixed / Completed"
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
          props.status === "Collected"
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
  );
}
