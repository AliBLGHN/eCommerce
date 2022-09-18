import axios from "axios";

const getAllProducts = async () => {
  return await axios.get(`${process.env.REACT_APP_API_BASE_URL}/basicproducts/all`);
};

const addProduct = async (data) => {
  console.log(...data);
  return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/basicproducts/`, data);
};

const updateProduct = async (data) => {
  return await axios.put(`${process.env.REACT_APP_API_BASE_URL}/basicproducts/` + data.get("id"), data);
};

const deleteProduct = async (id) => {
  return await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/basicproducts/` + id);
};

const productServices = {
  getAllProducts,
  addProduct,
  deleteProduct,
  updateProduct,
};
export default productServices;
