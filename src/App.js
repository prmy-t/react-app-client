import { Route, Switch, useHistory } from "react-router-dom";
import { Container, Modal, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { boolActions } from "./store/boolSlice";
import { useCookies } from "react-cookie";
import { userActions } from "./store/userSlice";
import Account from "./pages/public/Account";
import axios from "axios";

//public_page_imports
import Login from "./pages/public/Login";
import Home from "./pages/public/Home";
import Services from "./pages/public/Services";
import NavBar from "./components/UI/NavBar";
import BookService from "./pages/public/BookService";
import Signup from "./pages/public/Signup";
//admin_page_imports
import AdminLogin from "./pages/admin/AdminLogin";
import Orders from "./pages/admin/Orders";
import PersonalOrder from "./pages/admin/PersonalOrder";
import { useEffect } from "react";
// import EthHome from "./pages/eth/EthHome";
const App = () => {
  const history = useHistory();
  const admin = useSelector((state) => state.bools.admin) ? "admin" : null;
  const logOutModal = useSelector((state) => state.bools.logOutModal);
  const dispatch = useDispatch(boolActions);
  const [cookies, , removeCookie] = useCookies(["isLoggedIn"]);

  if (cookies.isLoggedIn)
    axios.defaults.headers.common["Authorization"] = cookies.token;
  useEffect(() => {
    if (cookies.activeUser && cookies.isLoggedIn) {
      if (cookies.activeUser.firstName === "admin")
        dispatch(boolActions.setAdmin(true));
      dispatch(boolActions.setIsLoggedIn(cookies.isLoggedIn));
      dispatch(userActions.setUser(cookies.activeUser));
    }
  }, [cookies, dispatch]);

  const closeHandler = () => {
    dispatch(boolActions.setLogOutModal(false));
  };
  const logOutHandler = () => {
    console.log("logout handler");
    removeCookie("isLoggedIn");
    removeCookie("activeUser");
    removeCookie("token");
    dispatch(boolActions.setLogOutModal(false));
    dispatch(boolActions.setIsLoggedIn(false));
    dispatch(boolActions.setAdmin(false));

    history.push("/login");
  };
  return (
    <Container>
      <NavBar admin={admin} />
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
        <Route path="/orders" exact>
          <Orders />
        </Route>
        <Route path="/orders/:email" exact>
          <PersonalOrder />
        </Route>
        {/* <Route path="/eth-home">
          <EthHome />
        </Route> */}
      </Switch>
    </Container>
  );
};

export default App;
