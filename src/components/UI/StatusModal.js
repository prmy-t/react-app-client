import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
export default function StatusModal(props) {
  const confirmModal = useSelector((state) => state.bools.confirmModal);
  return (
    <Modal
      width="500px"
      show={confirmModal}
      size="lg"
      centered
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4> Confirm Action</h4>
        <p>Are you sure to change the status ?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={props.cancelHandler}>
          cancel
        </Button>
        <Button variant="success" onClick={props.confirmHandler}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
