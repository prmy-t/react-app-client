import { Container, Row, Col } from "react-bootstrap";

import UserForm from "../../components/forms/UserForm";

import { useLocation } from "react-router-dom";

const Login = () => {
  const loc = useLocation();
  let notice = "";
  if (loc.state) notice = loc.state.notice;

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col lg="6" md="6" sm="10" xs="12">
          <UserForm
            passwordHolder="Enter Password"
            type="Log in"
            endLine="Not have an Account ?"
            endBtn="Sign up"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
