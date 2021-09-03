import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ServiceForm from "../../components/forms/ServiceForm";
import BackBtn from "../../components/buttons/BackBtn";

const BookService = () => {
  const params = useParams();
  const serviceName = params.serviceName.split("-").join(" ").toUpperCase();

  return (
    <Container>
      <BackBtn />
      <Row>
        <Col className="text-center">
          <div className="h4">{serviceName}</div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg="10" md="10" sm="10" xs="12">
          <ServiceForm />
        </Col>
      </Row>
    </Container>
  );
};

export default BookService;
