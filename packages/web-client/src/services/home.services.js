import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// get all events
const getAllEvents = () => {
  return axios({
    method: "get",
    url: `${BASE_URL}/home/events`,
  });
};

// modify event
const modifyEvent = (payload, id) => {
  return axios({
    method: "put",
    url: `${BASE_URL}/home/events/${id}`,
    data: payload,
  });
};

export default {
  getAllEvents,
  modifyEvent,
};
