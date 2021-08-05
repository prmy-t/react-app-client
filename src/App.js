import { Route, Switch, useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";

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
import LogOutModal from "./components/UI/LogOutModal";
// import EthHome from "./pages/eth/EthHome";
const App = () => {
  const history = useHistory();
  const admin = useSelector((state) => state.bools.admin) ? "admin" : null;

  const dispatch = useDispatch(boolActions);
  const [cookies, , removeCookie] = useCookies();

  if (cookies.isLoggedIn)
    axios.defaults.headers.common["Authorization"] = cookies.token;

  useEffect(() => {
    if (cookies.activeUser && cookies.isLoggedIn) {
      dispatch(boolActions.setIsLoggedIn(cookies.isLoggedIn));
      dispatch(userActions.setUser(cookies.activeUser));
    }
    if (
      cookies.isLoggedIn &&
      cookies.activeUser &&
      cookies.activeUser.firstName === "admin"
    )
      dispatch(boolActions.setAdmin(true));
  }, [cookies.isLoggedIn, cookies.activeUser, dispatch]);

  const closeHandler = () => {
    dispatch(boolActions.setLogOutModal(false));
  };
  const logOutHandler = () => {
    removeCookie("isLoggedIn", { path: "/" });
    removeCookie("activeUser", { path: "/" });
    removeCookie("token", { path: "/" });
    dispatch(boolActions.setLogOutModal(false));
    dispatch(boolActions.setIsLoggedIn(false));
    dispatch(boolActions.setAdmin(false));
    history.push("/login");
    console.log(cookies.isLoggedIn);
  };
  return (
    <Container>
      <NavBar admin={admin} />
      <LogOutModal logOutHandler={logOutHandler} closeHandler={closeHandler} />

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
