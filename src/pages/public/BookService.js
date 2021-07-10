import { Container, Row, Col, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import ServiceForm from "../../components/forms/ServiceForm";
import { FaAngleLeft } from "react-icons/fa";
import { useState } from "react";

const BookService = () => {
  const params = useParams();
  const history = useHistory();

  const serviceName = params.serviceName.split("-").join(" ").toUpperCase();
  const [page, setPage] = useState(1);

  const pageHandler = (value) => {
    value === "plus"
      ? setPage((prev) => {
          return prev + 1;
        })
      : setPage((prev) => {
          return prev - 1;
        });

    console.log(page);
  };
  const backHandler = () => {
    history.push("/services");
  };
  return (
    <Container>
      <Row className="my-2">
        <Col lg="2" md="2" sm="2" xs="4">
          <Button size="sm" variant="outline" onClick={backHandler}>
            <FaAngleLeft />
            Back
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <div className="h4">{serviceName}</div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg="10" md="10" sm="10" xs="12">
          <ServiceForm pageListener={pageHandler} />
        </Col>
      </Row>
    </Container>
  );
};

export default BookService;
