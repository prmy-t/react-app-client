import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { FaAngleRight } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
export default function Orders() {
  const history = useHistory();
  const [cookies] = useCookies();
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!cookies.token) history.push("/login");
    setLoading(true);
    const loadOrders = async () => {
      const res = await axios.get("http://localhost:3000/get-orders");
      if (res) {
        setLoading(false);
        setInfo(res.data);
      }
    };
    loadOrders();
  }, [cookies.token, history]);

  const clickHandler = (email) => {
    history.push("/orders/" + email);
  };
  return (
    <>
      <Container className="my-3">
        {loading && (
          <Row className="justify-content-center">
            <Spinner animation="border" role="status"></Spinner>
          </Row>
        )}
        <Row>
          {info.length > 0 &&
            !loading &&
            info.map((ele) => (
              <Col lg="4" md="6" sm="6" xs="12" className="my-1" key={ele._id}>
                <Card bg="light" className="p-3">
                  <Card.Title>Name: {ele._id}</Card.Title>
                  <Card.Body>
                    <h5>Orders: {ele.orders}</h5>
                  </Card.Body>
                  <Row className="justify-content-end">
                    <Col lg="6" md="5" sm="7" xs="5">
                      <Button onClick={() => clickHandler(ele._id)}>
                        Explore
                        <span>
                          <FaAngleRight size="12" />
                        </span>
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          {info.length < 0 && !loading && <h3>No appointments are taken!</h3>}
        </Row>
      </Container>
    </>
  );
}
