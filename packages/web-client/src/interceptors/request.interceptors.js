import axios from "axios";
import authHeader from "./auth-header";

const requestInterceptor = axios.interceptors.request.use(
  (request) => {
    request.headers = authHeader();
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default requestInterceptor;
