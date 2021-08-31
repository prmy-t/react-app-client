import { useEffect } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { FaAngleRight } from "react-icons/fa";

import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

import { useQuery } from "react-query";
import { getOrders } from "../../api/admin";

export default function Orders() {
  const history = useHistory();
  const [cookies] = useCookies();
  const { isLoading, data: orders, isError } = useQuery("getOrders", getOrders);
  useEffect(() => {
    if (!cookies.isLoggedIn && !cookies.token) history.push("/login");
  });

  const clickHandler = (email) => {
    history.push("/orders/" + email);
  };
  return (
    <Container className="my-3">
      {isLoading && (
        <Row className="justify-content-center">
          <Spinner animation="border" role="status"></Spinner>
        </Row>
      )}
      <Row>
        {orders &&
          orders.length > 0 &&
          !isLoading &&
          orders.map((ele) => (
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
        {orders && orders.length < 0 && !isLoading && (
          <Col className="text-center" variant="danger">
            No appointments are taken!
          </Col>
        )}
        {isError && (
          <Col className="text-center" variant="danger">
            Error fetching api. Try reloading page.
          </Col>
        )}
      </Row>
    </Container>
  );
}
