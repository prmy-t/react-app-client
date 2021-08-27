import { Container, Row, Col } from "react-bootstrap";
import UserForm from "../../components/forms/UserForm";
import { motion } from "framer-motion";

const Login = () => {
  return (
    <Container
      as={motion.div}
      className="mt-5"
      exit={{ x: "-100vw" }}
      transition={{ ease: "easeInOut" }}
    >
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
