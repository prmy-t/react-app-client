import axios from "axios";
import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { boolActions } from "../../store/boolSlice";
import { useParams } from "react-router-dom";
import AppointmentCard from "../../components/UI/AppointmentCard";
import StatusModal from "../../components/UI/StatusModal";

export default function PersonalOrder() {
  const params = useParams();
  const email = params.email;
  const dispatch = useDispatch();
  const status = useSelector((state) => state.vars.status);
  const orderId = useSelector((state) => state.vars.orderId);
  const [info, setInfo] = useState([]);
  const cancelHandler = () => {
    dispatch(boolActions.setConfirmModal(false));
  };
  const confirmHandler = async () => {
    const res = await axios.post("http://localhost:3000/change-status", {
      newStatus: status,
      id: orderId,
    });
    if (res.data === "saved") {
      window.location.reload();
    }
    dispatch(boolActions.setConfirmModal(false));
  };
  useEffect(() => {
    const loadData = async () => {
      const res = await axios.post("http://localhost:3000/personal-orders", {
        email,
      });
      if (res) {
        setInfo(res.data);
      }
    };
    loadData();
  }, [email]);

  return (
    <Container>
      <Row>
        {info &&
          info.map((order) => {
            return (
              <Col
                className="my-4"
                lg="12"
                md="12"
                sm="12"
                xs="12"
                key={order._id}
              >
                <AppointmentCard order={order} />
              </Col>
            );
          })}
      </Row>
      <StatusModal
        confirmHandler={confirmHandler}
        cancelHandler={cancelHandler}
      />
    </Container>
  );
}
