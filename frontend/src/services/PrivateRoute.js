import { Navigate, Outlet } from "react-router-dom";
import jwt from "jwt-decode";
import { useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("jwtToken");
  const user = token && jwt(token).user;
  const location = useLocation();
  //*****************   ADMIN *******************************************************************************
  if (location.pathname === "/admin") {
    return user && user.user_level === 0 ? <Outlet /> : <Navigate to="/" />;
  }

  //*****************  STORE OWNER AND STORE WORKER  *******************************************************
  if (location.pathname === "/store") {
    return user && (user.user_level === 1 || (user.user_level === 2 && user.store_id != null)) ? <Outlet /> : <Navigate to="/" />;
  }

  //*****************  OTHER   *************************************************************

  if (location.pathname !== "/") {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;
