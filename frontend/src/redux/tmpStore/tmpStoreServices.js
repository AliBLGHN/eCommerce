import axios from "axios";

const getTmpStores = async () => {
  return await axios.get(`${process.env.REACT_APP_API_BASE_URL}/tmpstores`);
};

const applyForStore = async (data) => {
  return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/tmpstores`, data);
};

const acceptTmpStore = async (id) => {
  return await axios.put(`${process.env.REACT_APP_API_BASE_URL}/tmpstores/` + id);
};

const rejectTmpStore = async (id) => {
  return await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/tmpstores/` + id);
};

const tmpStoreServices = {
  getTmpStores,
  applyForStore,
  acceptTmpStore,
  rejectTmpStore,
};
export default tmpStoreServices;
