import { useEffect } from "react";
import { Container, Col, Row, Card, Spinner } from "react-bootstrap";
import { useQuery } from "react-query";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import AppointmentCard from "../../components/UI/AppointmentCard";
import { getAppointments } from "../../api/public";
const Account = () => {
  const [cookies] = useCookies();
  const history = useHistory();
  const { isLoading, data: appointments } = useQuery(
    "getAppointments",
    getAppointments
  );
  useEffect(() => {
    if (!cookies.token) history.push("/login");
  }, [cookies.token, history]);

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
              {isLoading && (
                <Row className="justify-content-center">
                  <Spinner animation="border" role="status"></Spinner>
                </Row>
              )}
              {appointments &&
                appointments.length > 0 &&
                !isLoading &&
                appointments.map((appo) => (
                  <Row key={appo._id}>
                    <Col>
                      <AppointmentCard order={appo} />
                    </Col>
                  </Row>
                ))}
              {appointments && appointments.length === 0 && !isLoading && (
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
