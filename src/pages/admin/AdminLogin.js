import { Container, Row, Col } from "react-bootstrap";
import UserForm from "../../components/forms/UserForm";
const AdminLogin = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col lg="6" md="6" sm="10" xs="12">
          <UserForm admin="hii" passwordHolder="Enter Password" type="Log in" />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLogin;
