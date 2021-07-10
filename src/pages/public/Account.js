import { useEffect, useState } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import AppointmentCard from "../../components/UI/AppointmentCard";
const Account = () => {
  const [appointments, setAppointments] = useState([]);
  const [cookies] = useCookies();
  const history = useHistory();
  useEffect(() => {
    if (!cookies.token) history.push("/login");
    const getAppointments = async () => {
      const res = await axios.get("http://localhost:3000/get-appointments", {
        headers: {
          authorization: cookies.token,
        },
      });
      if (res) {
        setAppointments(res.data);
      }
    };
    getAppointments();
  }, []);
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
                {appointments.length > 0 ? (
                  appointments.map((appo) => (
                    <Row key={appo._id}>
                      <Col>
                        <AppointmentCard
                          name={appo.name}
                          contact={appo.contact}
                          date={appo.date}
                          vehicleType={appo.vehicleType}
                          serviceType={appo.serviceType}
                          engineType={appo.engineType}
                          description={appo.description}
                        />
                      </Col>
                    </Row>
                  ))
                ) : (
                  <h5 className="text-center text-muted">
                    No appointment has been taken.
                  </h5>
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
