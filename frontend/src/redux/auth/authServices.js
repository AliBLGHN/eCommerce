import axios from "axios";

const loginUser = async (user) => {
  return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, user);
};

const logoutUser = async () => {
  return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/logout`);
};

const registerUser = async (user) => {
  return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, user);
};

const me = async () => {
  return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/me`);
};
const authServices = {
  loginUser,
  logoutUser,
  registerUser,
  me,
};
export default authServices;
