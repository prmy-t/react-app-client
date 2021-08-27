import { Row, Col, Form, Card, Button, Toast } from "react-bootstrap";
import classes from "./UserForm.module.css";
import { FaUserAlt, FaKey } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import btnVariants from "../variants/button";

import axios from "axios";
import { useDispatch } from "react-redux";
import { boolActions } from "../../store/boolSlice";
import { useCookies } from "react-cookie";
import { userActions } from "../../store/userSlice";
import Field from "./Field";
const UserForm = (props) => {
  const history = useHistory();
  const dispatch = useDispatch(boolActions);
  const location = useLocation();
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setCookie] = useCookies(["isLoggedIn", "activeUser"]);
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

    if (props.admin && props.type === "Log in") {
      const res = await axios.post("http://localhost:3000/admin-login", {
        email,
        password,
      });

      if (res.data.status === "success") {
        setCookie("isLoggedIn", true, { path: "/" });
        dispatch(boolActions.setIsLoggedIn(true));
        dispatch(userActions.setUser(res.data.user));
        dispatch(boolActions.setAdmin(true));
        res.data.password = "";
        setCookie("activeUser", res.data.user, { path: "/" });
        setCookie("token", res.data.token, { path: "/" });
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

      if (res && res.data.status === "none") {
        setError(res.data.error);
        toggleFound(true);
      } else {
        setCookie("isLoggedIn", true, { path: "/" });
        dispatch(boolActions.setIsLoggedIn(true));
        dispatch(userActions.setUser(res.data.user));
        res.data.password = "";
        setCookie("activeUser", res.data.user, { path: "/" });
        setCookie("token", res.data.token, { path: "/" });
        axios.defaults.headers.common["Authorization"] = res.data.token;
        toggleFound(false);
        history.push("/");
      }
    } else if (props.type === "Sign up") {
      if (fName && lName && email && password) {
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
      } else {
        setError("All the fields are required!");
        setFound(true);
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
                <Field
                  className="m-1"
                  children={<FaUserAlt />}
                  handler={fNameHandler}
                  placeholder="First Name"
                />
              </Col>
              <Col lg="6" md="6" sm="6" xs="6">
                <Field
                  className="m-1"
                  children={<FaUserAlt />}
                  handler={lNameHandler}
                  placeholder="Last Name"
                />
              </Col>
            </Row>
          ) : (
            ""
          )}
          <Row className="justify-content-center">
            <Col lg="8" md="8" sm="8" xs="12">
              <Field
                className="m-1"
                children={<FaUserAlt />}
                handler={emailHandler}
                placeholder="Enter email"
              />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg="8" md="8" sm="8" xs="12">
              <Field
                className="m-1"
                type="password"
                children={<FaKey />}
                handler={passwordHandler}
                placeholder={props.passwordHolder}
              />
            </Col>
          </Row>
        </Card.Body>
        <Row className="justify-content-center">
          <Col lg="4" md="4" sm="4" xs="4" className="text-center">
            <Button
              as={motion.button}
              variants={btnVariants}
              whileHover="hover"
              whileTap="tap"
              type="submit"
            >
              {props.type}
            </Button>
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
