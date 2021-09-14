import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const getAllTickets = () => {
  return axios({
    method: "get",
    url: `${BASE_URL}/tickets`,
  });
};

const deleteTicketById = (id) => {
  return axios({
    method: "delete",
    url: `${BASE_URL}/tickets/${id}`,
  });
};

export default {
  getAllTickets,
  deleteTicketById,
};
