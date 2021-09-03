import { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { boolActions } from "../../store/boolSlice";
import { useParams } from "react-router-dom";
import AppointmentCard from "../../components/UI/AppointmentCard";
import StatusModal from "../../components/modals/StatusModal";

import {
  getPersonalAppointment,
  setStatusApi,
} from "../../store/appointmentSlice";

export default function PersonalOrder() {
  const params = useParams();
  const email = params.email;
  const dispatch = useDispatch();
  const status = useSelector((state) => state.vars.status);
  const orderId = useSelector((state) => state.vars.orderId);
  const info = useSelector((state) => state.appointments.pAppointments);
  const cancelHandler = () => {
    dispatch(boolActions.setConfirmModal(false));
  };
  const confirmHandler = async () => {
    dispatch(setStatusApi({ newStatus: status, id: orderId }));
    dispatch(boolActions.setConfirmModal(false));
  };
  useEffect(() => {
    dispatch(getPersonalAppointment({ email }));
  }, [dispatch, email]);

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
