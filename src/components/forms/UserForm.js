import {
  Row,
  Col,
  Form,
  InputGroup,
  Card,
  FormControl,
  Button,
  Toast,
} from "react-bootstrap";
import classes from "./UserForm.module.css";
import { FaUserAlt, FaKey } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import axios from "axios";
import { useDispatch } from "react-redux";
import { boolActions } from "../../store/boolSlice";
import { useCookies } from "react-cookie";
import { userActions } from "../../store/userSlice";

const UserForm = (props) => {
  const history = useHistory();
  const dispatch = useDispatch(boolActions);
  const location = useLocation();
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies(["isLoggedIn", "activeUser"]);
  const [found, setFound] = useState(false);
  const [exist, setExist] = useState(false);
  const [error, setError] = useState("");
  let [notice, setNotice] = useState(null);
  useEffect(() => {
    if (location.state) setNotice(location.state.notice);
  }, [location.state]);

  const fNameHandler = (event) => {
    setFName(event.target.value);
  };
  const lNameHandler = (event) => {
    setLName(event.target.value);
  };
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(props.admin);
    if (props.admin && props.type === "Log in") {
      console.log("jii");
      const res = await axios.post("http://localhost:3000/admin-login", {
        email,
        password,
      });
      console.log(res.data);
      if (res.data.status === "success") {
        setCookie("isLoggedIn", true);
        dispatch(boolActions.setIsLoggedIn(true));
        res.data.password = "";
        setCookie(["activeUser"], res.data.user);
        setCookie(["token"], res.data.token);
        axios.defaults.headers.common["Authorization"] = res.data.token;
        history.push("/");
      } else {
        setFound(true);
        setError(res.data.error);
      }
    } else if (props.type === "Log in") {
      const res = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      if (res && res.data === "none") toggleFound(true);
      else {
        setError(res.data.error);
        setCookie("isLoggedIn", true);
        dispatch(boolActions.setIsLoggedIn(true));
        dispatch(userActions.setUser(res.data.user));
        res.data.password = "";
        setCookie(["activeUser"], res.data.user);
        setCookie(["token"], res.data.token);
        axios.defaults.headers.common["Authorization"] = res.data.token;
        toggleFound(false);
        history.push("/");
      }
    } else if (props.type === "Sign up") {
      const res = await axios.post("http://localhost:3000/signup", {
        fName,
        lName,
        email,
        password,
      });

      if (res && res.data === "saved") {
        history.push({
          pathname: "/login",
          state: {
            notice: "Login to continue",
          },
        });
      }
      if (res && res.data === "exist") {
        setExist(true);
      }
    }
  };

  const toggleFound = (value) => {
    value === true ? setFound(true) : setFound(false);
  };
  const toggleNotice = () => {
    setNotice(null);
  };
  const toggleExist = () => {
    setExist(false);
  };
  const endBtnHandler = () => {
    const route = props.endBtn.replace(/\s+/g, "").trim().toLowerCase();
    history.push("/" + route);
  };
  return (
    <Card className="p-3" bg="light">
      <Card.Title>
        <h4>{props.type}</h4>
      </Card.Title>
      <Form onSubmit={submitHandler}>
        <Card.Body>
          <Row className="justify-content-center">
            <Col lg="10" md="10" sm="10" xs="12">
              <Toast
                className={classes.toastFound}
                show={found}
                onClose={toggleFound}
              >
                <Toast.Header>
                  Error
                  <div className="mr-auto"></div>
                </Toast.Header>
                <Toast.Body>{error}</Toast.Body>
              </Toast>

              <Toast
                className={classes.toastSigned}
                show={notice}
                onClose={toggleNotice}
              >
                <Toast.Header>
                  Account created !<div className="mr-auto"></div>
                </Toast.Header>
                <Toast.Body>Enter Email and password to continue.</Toast.Body>
              </Toast>
              <Toast
                className={classes.toastExist}
                show={exist}
                onClose={toggleExist}
              >
                <Toast.Header>
                  User Exist !<div className="mr-auto"></div>
                </Toast.Header>
                <Toast.Body>Use different email Address.</Toast.Body>
              </Toast>
            </Col>
          </Row>
          {props.type === "Sign up" ? (
            <Row className="justify-content-center">
              <Col lg="6" md="6" sm="6" xs="6">
                <InputGroup className="m-1">
                  <InputGroup.Text>
                    <FaUserAlt />
                  </InputGroup.Text>
                  <FormControl
                    onChange={fNameHandler}
                    placeholder="First Name"
                  ></FormControl>
                </InputGroup>
              </Col>
              <Col lg="6" md="6" sm="6" xs="6">
                <InputGroup className="m-1">
                  <InputGroup.Text>
                    <FaUserAlt />
                  </InputGroup.Text>
                  <FormControl
                    onChange={lNameHandler}
                    placeholder="Last Name"
                  ></FormControl>
                </InputGroup>
              </Col>
            </Row>
          ) : (
            ""
          )}
          <Row className="justify-content-center">
            <Col lg="8" md="8" sm="8" xs="12">
              <InputGroup className="m-1">
                <InputGroup.Text>
                  <FaUserAlt />
                </InputGroup.Text>
                <FormControl
                  onChange={emailHandler}
                  placeholder="Enter email"
                ></FormControl>
              </InputGroup>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg="8" md="8" sm="8" xs="12">
              <InputGroup className="m-1">
                <InputGroup.Text>
                  <FaKey />
                </InputGroup.Text>
                <FormControl
                  type="password"
                  onChange={passwordHandler}
                  placeholder={props.passwordHolder}
                ></FormControl>
              </InputGroup>
            </Col>
          </Row>
        </Card.Body>
        <Row className="justify-content-center">
          <Col lg="4" md="4" sm="4" xs="4" className="text-center">
            <Button type="submit">{props.type}</Button>
          </Col>
        </Row>
      </Form>
      {props.admin === "true" ? null : (
        <>
          <hr />
          <Row>
            <Col className="text-center">{props.endLine}</Col>
          </Row>
          <Row className="m-1">
            <Col className="text-center">
              <Button variant="outline-info" onClick={endBtnHandler}>
                {props.endBtn}
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Card>
  );
};

export default UserForm;
