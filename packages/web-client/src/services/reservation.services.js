import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// create reservation
const createReservation = (idEvent) => {
  return axios({
    method: "post",
    url: `${BASE_URL}/reservation/${idEvent}`,
  });
};

export default { createReservation };
