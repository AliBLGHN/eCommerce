import { Outlet } from "react-router-dom";
import axios from "axios";

const AxiosConfig = () => {
  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${localStorage.getItem("jwtToken")}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return <Outlet />;
};

export default AxiosConfig;
