import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col
          className="text-center font-font-weight-light h3"
          lg="12"
          md="12"
          sm="12"
          xs="12"
        >
          Hello {user.firstName}! Welcome to The <b>Great</b> Garage.
        </Col>
      </Row>
      {/* <Row className="justify-content-center">
        <Col className="text-center font-font-weight-light h3" lg="12">
          Hello there! Welcome to The <b>Great</b> Garage.
        </Col>
      </Row> */}
    </Container>
  );
};
export default Home;
