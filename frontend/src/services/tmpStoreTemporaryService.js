import axios from "axios";

export const checkUserApplication = async (id) => {
  const data = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/tmpstores/user/` + id).then((response) => {
    console.log(response);
    return response.data;
  });
  return data;
};
