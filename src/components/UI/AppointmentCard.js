import { Card, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import SetStatus from "./SetStatus";
import ShowStatus from "./ShowStatus";

export default function AppointmentCard(props) {
  const admin = useSelector((state) => state.bools.admin);
  return (
    <>
      <span className="h5 font-weight-bold">{props.order.date}</span>
      <Card bg="light">
        <Card.Header className="h4">{props.order.serviceType}</Card.Header>
        <Card.Body className="p-4">
          <Row>
            <Col lg="6" md="6" sm="6" xs="12">
              Name: <b>{props.order.name}</b>
            </Col>
            <Col lg="6" md="6" sm="6" xs="12">
              Contact: <b>{props.order.contact}</b>
            </Col>
            <Col lg="6" md="6" sm="6" xs="12">
              VehicleType: <b>{props.order.vehicleType}</b>
            </Col>
            <Col lg="6" md="6" sm="6" xs="12">
              EngineType: <b>{props.order.engineType}</b>
            </Col>
            <Col lg="12" md="12" sm="12" xs="12">
              Description:
            </Col>
            <Col className="ml-4" lg="12" md="12" sm="12" xs="12">
              <b>{props.order.engineType}</b>
            </Col>
            <Col className="mt-4 h5">Set Status:</Col>
          </Row>
          {admin ? (
            <SetStatus status={props.order.status} id={props.order._id} />
          ) : (
            <ShowStatus status={props.order.status} id={props.order._id} />
          )}
        </Card.Body>
      </Card>
    </>
  );
}
