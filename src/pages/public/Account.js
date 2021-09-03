import { useEffect } from "react";
import { Container, Col, Row, Card, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import AppointmentCard from "../../components/UI/AppointmentCard";

import { getAppointment } from "../../store/appointmentSlice";
const Account = () => {
  const [cookies] = useCookies();
  const history = useHistory();
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments.appointments);
  const status = useSelector((state) => state.appointments.status);
  useEffect(() => {
    if (!cookies.token) history.push("/login");
    dispatch(getAppointment());
  }, [cookies.token, history, dispatch]);

  return (
    <Container className="my-3">
      <Row>
        <Col className="h3">Account</Col>
      </Row>
      <Row>
        <Col>
          <Card bg="light" className="p-3">
            <Card.Title>Appointment Information</Card.Title>
            <Card.Body>
              {status === "loading" && (
                <Row className="justify-content-center">
                  <Spinner animation="border" role="status"></Spinner>
                </Row>
              )}
              {appointments &&
                appointments.length > 0 &&
                status === "success" &&
                appointments.map((appo) => (
                  <Row key={appo._id}>
                    <Col>
                      <AppointmentCard order={appo} />
                    </Col>
                  </Row>
                ))}
              {appointments &&
                appointments.length === 0 &&
                status === "success" && (
                  <Row className="justify-content-center">
                    <h5>No appointment found!</h5>
                  </Row>
                )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Account;
