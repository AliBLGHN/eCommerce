import axios from "axios";

const getAllMains = async () => {
  return await axios.get(`${process.env.REACT_APP_API_BASE_URL}/maincategories/all`);
};

const getMains = async () => {
  return await axios.get(`${process.env.REACT_APP_API_BASE_URL}/maincategories/`);
};

const updateMainCategory = async (id, data) => {
  return await axios.put(`${process.env.REACT_APP_API_BASE_URL}/maincategories/` + id, data);
};

const addMainCategory = async (data) => {
  return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/maincategories/`, data);
};

const deleteMainCategory = async (id) => {
  return await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/maincategories/` + id);
};

const mainCategoryServices = {
  getAllMains,
  updateMainCategory,
  addMainCategory,
  deleteMainCategory,
  getMains,
};
export default mainCategoryServices;
