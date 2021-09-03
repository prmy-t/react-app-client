import axios from "axios";
import { useState } from "react";
import {
  Dropdown,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Card,
  DropdownButton,
  Form,
} from "react-bootstrap";
const EthHome = () => {
  const apiKey =
    "d245e8d08307d07239fef64508e171e052229526f025151d197f92290027a1cd";
  const options = [1, 2, 3];
  const [eth, setEth] = useState(0);
  const [dropSelection, setDropSelection] = useState("");
  const [outValue, setOutValue] = useState(0);

  const optionSelect = (value) => {
    setDropSelection(value);
  };

  const ETHHandler = (event) => {
    setEth(event.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await axios.get(
      `https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,DASH&tsyms=BTC,USD,EUR&api_key=${apiKey}`
    );
  };
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card className="p-3" bg="light">
            <Card.Title>ETH Converter</Card.Title>
            <Card.Body>
              <Form onSubmit={submitHandler}>
                <Row className="justify-content-center">
                  <Col lg="3" md="3" sm="3" xs="12">
                    <InputGroup>
                      <InputGroup.Text></InputGroup.Text>
                      <FormControl
                        onChange={ETHHandler}
                        placeholder="ETH"
                      ></FormControl>
                    </InputGroup>
                  </Col>
                  <Col lg="2" md="2" sm="2" xs="6">
                    <Button variant="success" type="submit">
                      Convert
                    </Button>
                  </Col>
                  <Col lg="3" md="3" sm="3" xs="12">
                    <InputGroup>
                      <DropdownButton
                        as={InputGroup.Append}
                        variant="outline-secondary"
                        title={dropSelection}
                        id="input-group-dropdown-2"
                      >
                        {options.map((option) => {
                          <Dropdown.Item
                            value="lol"
                            onClick={() => {
                              optionSelect(option);
                            }}
                          >
                            lol
                          </Dropdown.Item>;
                        })}
                      </DropdownButton>
                      <FormControl placeholder="USD"></FormControl>
                    </InputGroup>
                  </Col>
                  <Col lg="1" md="1" sm="1" xs="4">
                    <Button>U</Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EthHome;
