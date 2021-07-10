import { Container, Row, Col, Button } from "react-bootstrap";
import { AiFillTool } from "react-icons/ai";
import { BsTools, BsGearFill } from "react-icons/bs";
import { FaCarAlt } from "react-icons/fa";
import { GiCarWheel } from "react-icons/gi";
import { useHistory } from "react-router-dom";
// import { GrServices } from "react-icons/gr";
const Services = () => {
  const history = useHistory();
  const clickHandler = (service) => {
    history.push("/services/" + service);
  };
  return (
    <Container className="mt-5">
      <Row>
        <Col className="h5">
          <FaCarAlt /> Register online for our Services
        </Col>
      </Row>
      <Row>
        <Col lg="3" md="3" sm="5" xs="12">
          <Button
            onClick={() => clickHandler("annual-service")}
            variant="outline-info"
            className="m-2"
          >
            <GiCarWheel className="m-1" />
            Annual Service
          </Button>
        </Col>
        <Col lg="3" md="3" sm="5" xs="12">
          <Button
            onClick={() => clickHandler("major-service")}
            variant="outline-info"
            className="m-2"
          >
            <BsGearFill className="m-1" />
            Major Service
          </Button>
        </Col>
        <Col lg="3" md="3" sm="5" xs="12">
          <Button
            onClick={() => clickHandler("repair-fault")}
            variant="outline-info"
            className="m-2"
          >
            <AiFillTool className="m-1" />
            Repair/Fault
          </Button>
        </Col>
        <Col lg="3" md="3" sm="5" xs="12">
          <Button
            onClick={() => clickHandler("major-repair")}
            variant="outline-info"
            className="m-2"
          >
            <BsTools className="m-1" />
            Major Repair
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Services;
