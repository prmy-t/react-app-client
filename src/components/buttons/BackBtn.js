import { Row, Col, Button } from "react-bootstrap";
import { FaAngleLeft } from "react-icons/fa";
import { useHistory } from "react-router-dom";
export default function BackBtn() {
  const history = useHistory();
  const backHandler = () => {
    history.push("/services");
  };
  return (
    <Row className="my-2">
      <Col lg="2" md="2" sm="2" xs="4">
        <Button size="sm" variant="outline" onClick={backHandler}>
          <FaAngleLeft />
          Back
        </Button>
      </Col>
    </Row>
  );
}
