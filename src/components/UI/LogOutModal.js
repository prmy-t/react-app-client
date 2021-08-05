import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
export default function LogOutModal(props) {
  const logOutModal = useSelector((state) => state.bools.logOutModal);
  return (
    <Modal
      show={logOutModal}
      onHide={props.closeHandler}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>Are you sure you want to Log out ?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.closeHandler}>
          Close
        </Button>
        <Button variant="primary" onClick={props.logOutHandler}>
          Log Out
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
