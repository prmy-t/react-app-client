import { Container, Row, Col } from "react-bootstrap";

import UserForm from "../../components/forms/UserForm";

const Signup = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col lg="6" md="6" sm="10" xs="12">
          <UserForm
            passwordHolder="Enter New Password"
            type="Sign up"
            endLine="Already have an Account ?"
            endBtn="Log in"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
