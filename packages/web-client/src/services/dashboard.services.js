import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// get stats
const getAllStats = () => {
  return axios({
    method: "get",
    url: `${BASE_URL}/dashboard`,
  });
};

export default {
  getAllStats,
};
