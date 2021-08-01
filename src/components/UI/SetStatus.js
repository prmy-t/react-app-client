import { Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { boolActions } from "../../store/boolSlice";
import { varActions } from "../../store/varSlice";

export default function SetStatus(props) {
  const dispatch = useDispatch();

  const clickHandler = (name) => {
    dispatch(varActions.setOrderId(props.id));
    dispatch(varActions.setStatus(name));
    dispatch(boolActions.setConfirmModal(true));
  };

  return (
    <>
      <Row>
        <Col lg="3" md="3" sm="3" xs="6">
          <Button
            onClick={() => clickHandler("Booked")}
            variant={props.status === "Booked" ? "success" : "outline-danger"}
          >
            Booked
          </Button>
        </Col>
        <Col lg="3" md="3" sm="3" xs="6">
          <Button
            onClick={() => clickHandler("In Service")}
            variant={
              props.status === "In Service" ? "success" : "outline-danger"
            }
          >
            In Service
          </Button>
        </Col>
        <Col lg="3" md="3" sm="3" xs="6">
          <Button
            onClick={() => clickHandler("Fixed / Completed")}
            variant={
              props.status === "Fixed / Completed"
                ? "success"
                : "outline-danger"
            }
          >
            Fixed / Completed
          </Button>
        </Col>
        <Col lg="3" md="3" sm="3" xs="6">
          <Button
            onClick={() => clickHandler("Collected")}
            variant={
              props.status === "Collected" ? "success" : "outline-danger"
            }
          >
            Collected
          </Button>
        </Col>
      </Row>
    </>
  );
}
