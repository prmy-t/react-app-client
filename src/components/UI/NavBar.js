import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { boolActions } from "../../store/boolSlice";
import { useHistory } from "react-router-dom";

const NavBar = (props) => {
  const isLoggedIn = useSelector((state) => state.bools.isLoggedIn);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch(boolActions);
  const history = useHistory();

  const accountHandler = () => {
    history.push("/account");
  };
  const logOutHandler = () => {
    dispatch(boolActions.setLogOutModal(true));
  };
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <b>Great</b> Garage
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {!props.admin && isLoggedIn && (
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
          )}

          {props.admin && isLoggedIn && (
            <LinkContainer to="/orders">
              <Nav.Link>Orders</Nav.Link>
            </LinkContainer>
          )}

          {!props.admin && isLoggedIn && (
            <LinkContainer to="/services">
              <Nav.Link>Services</Nav.Link>
            </LinkContainer>
          )}
        </Nav>
        <Nav>
          {!isLoggedIn && (
            <>
              <LinkContainer to="/login">
                <Nav.Link>Log in</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/signup">
                <Nav.Link>Sign up</Nav.Link>
              </LinkContainer>
            </>
          )}
          {isLoggedIn && (
            <NavDropdown
              title={user.firstName}
              alignRight
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item onClick={accountHandler}>
                Account
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item
                style={{ color: "red" }}
                onClick={logOutHandler}
              >
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
