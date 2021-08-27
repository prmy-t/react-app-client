import { InputGroup, FormControl } from "react-bootstrap";
export default function Field(props) {
  return (
    <InputGroup className={props.className}>
      <InputGroup.Text>{props.children}</InputGroup.Text>
      <FormControl
        type={props.type}
        onChange={props.handler}
        placeholder={props.placeholder}
      ></FormControl>
    </InputGroup>
  );
}
