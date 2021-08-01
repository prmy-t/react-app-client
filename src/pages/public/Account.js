import { useEffect, useState } from "react";
import { Container, Col, Row, Card, Spinner } from "react-bootstrap";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import AppointmentCard from "../../components/UI/AppointmentCard";
const Account = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies();
  const history = useHistory();
  useEffect(() => {
    if (!cookies.token) history.push("/login");
    setLoading(true);
    const getAppointments = async () => {
      const res = await axios.get("http://localhost:3000/get-appointments");
      if (res) {
        setLoading(false);
        setAppointments(res.data);
      }
    };
    getAppointments();
  }, [cookies.token, history]);
  return (
    <>
      <Container className="my-3">
        <Row>
          <Col className="h3">Account</Col>
        </Row>
        <Row>
          <Col>
            <Card bg="light" className="p-3">
              <Card.Title>Appointment Information</Card.Title>
              <Card.Body>
                {loading && (
                  <Row className="justify-content-center">
                    <Spinner animation="border" role="status"></Spinner>
                  </Row>
                )}
                {appointments.length > 0 &&
                  !loading &&
                  appointments.map((appo) => (
                    <Row key={appo._id}>
                      <Col>
                        <AppointmentCard order={appo} />
                      </Col>
                    </Row>
                  ))}
                {appointments.length === 0 && !loading && (
                  <Row className="justify-content-center">
                    <h5>No appointment found!</h5>
                  </Row>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Account;
