import { Alert } from "react-bootstrap";
export default function AnAlert(props) {
  return (
    <Alert
      size={props.size}
      show={props.show}
      variant={props.variant}
      onClose={props.onClose}
      dismissible
    >
      <Alert.Heading className="h5">{props.heading}</Alert.Heading>
    </Alert>
  );
}
