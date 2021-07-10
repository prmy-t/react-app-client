import { Route, Switch, useHistory } from "react-router-dom";
import { Container, Modal, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { boolActions } from "./store/boolSlice";
import { useCookies } from "react-cookie";
import { userActions } from "./store/userSlice";
import Account from "./pages/public/Account";
import { authActions } from "./store/authSlice";

//page_imports
import Login from "./pages/public/Login";
import Home from "./pages/public/Home";
import Services from "./pages/public/Services";
import NavBar from "./components/UI/NavBar";
import BookService from "./pages/public/BookService";
import Signup from "./pages/public/Signup";
import AdminLogin from "./pages/admin/AdminLogin";

import EthHome from "./pages/eth/EthHome";

const App = () => {
  const history = useHistory();
  const logOutModal = useSelector((state) => state.bools.logOutModal);
  const dispatch = useDispatch(boolActions);
  const [cookies, setCookie, removeCookie] = useCookies(["isLoggedIn"]);
  useEffect(() => {
    if (cookies.activeUser && cookies.isLoggedIn) {
      dispatch(boolActions.setIsLoggedIn(cookies.isLoggedIn));
      dispatch(userActions.setUser(cookies.activeUser));
    }
    // if (cookies.token) {
    //   console.log("hello ne");
    //   dispatch(authActions.reverify(cookies.token));
    //   console.log("done");
    // }
  }, []);

  const closeHandler = () => {
    dispatch(boolActions.setLogOutModal(false));
  };
  const logOutHandler = () => {
    removeCookie("isLoggedIn");
    removeCookie("activeUser");
    removeCookie("token");
    dispatch(boolActions.setLogOutModal(false));
    dispatch(boolActions.setIsLoggedIn(false));
    history.push("/login");
  };
  return (
    <Container>
      <NavBar />
      <Modal
        show={logOutModal}
        onHide={closeHandler}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>Are you sure you want to Log out ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeHandler}>
            Close
          </Button>
          <Button variant="primary" onClick={logOutHandler}>
            Log Out
          </Button>
        </Modal.Footer>
      </Modal>

      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/account" exact>
          <Account />
        </Route>
        <Route path="/services" exact>
          <Services />
        </Route>
        <Route path="/services/:serviceName">
          <BookService />
        </Route>
        <Route path="/admin">
          <AdminLogin />
        </Route>
        <Route path="/eth-home">
          <EthHome />
        </Route>
      </Switch>
    </Container>
  );
};

export default App;
