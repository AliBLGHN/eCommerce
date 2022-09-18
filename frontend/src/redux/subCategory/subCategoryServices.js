import axios from "axios";

const getAllSubs = async () => {
  return await axios.get(`${process.env.REACT_APP_API_BASE_URL}/subcategories`);
};

const updateSubCategory = async (id, data) => {
  return await axios.put(`${process.env.REACT_APP_API_BASE_URL}/subcategories/` + id, data);
};

const addSubCategory = async (data) => {
  return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/subcategories/`, data);
};

const deleteSubCategory = async (id) => {
  return await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/subcategories/` + id);
};

const subCategoryServices = {
  getAllSubs,
  updateSubCategory,
  addSubCategory,
  deleteSubCategory,
};
export default subCategoryServices;
