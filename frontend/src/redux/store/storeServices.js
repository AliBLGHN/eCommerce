import axios from "axios";

const getStores = async () => {
  return await axios.get(`${process.env.REACT_APP_API_BASE_URL}/stores`);
};

const bannedStore = async (id) => {
  return await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/stores/` + id);
};

const storeServices = {
  getStores,
  bannedStore,
};
export default storeServices;
