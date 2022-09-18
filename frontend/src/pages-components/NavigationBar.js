import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LogoutIcon from "@mui/icons-material/Logout";
import NavDropdown from "react-bootstrap/NavDropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import LoginRegisterModal from "./LoginRegisterModal";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import toast from "react-hot-toast";

function NavigationBar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await dispatch(logout())
      .then((response) => {
        toast.success("Successfully logged out.");
      })
      .catch((error) => {
        toast.error(error);
      });
    navigate("/");
  };
  return (
    <Navbar className="navbar-info bg-warning border border-dark" bg="warning" navbar="info" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          | Pro<strong style={{ color: "red" }}>x</strong>tore |
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Nav>
            {user ? (
              <DropdownButton id="dropdown-basic-button" title={user.name + " "} variant="warning">
                {user.user_level === 0 && (
                  <NavDropdown.Item as={Link} to="/admin">
                    <AdminPanelSettingsIcon /> Admin
                  </NavDropdown.Item>
                )}

                {(user.user_level === 1 || (user.user_level === 2 && user.store_id)) && (
                  <NavDropdown.Item as={Link} to="/store">
                    <StorefrontIcon /> Store Manage
                  </NavDropdown.Item>
                )}

                <NavDropdown.Item onClick={logoutHandler}>
                  <LogoutIcon /> Logout
                </NavDropdown.Item>
              </DropdownButton>
            ) : (
              <span className="">
                <LoginRegisterModal />
              </span>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
