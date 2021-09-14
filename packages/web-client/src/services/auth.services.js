import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const register = (payload) => {
  return axios({
    method: "post",
    url: `${BASE_URL}/register`,
    data: payload,
  });
};

const login = (payload) => {
  return axios({
    method: "post",
    url: `${BASE_URL}/login`,
    data: payload,
  });
};

const forgotPassword = (payload) => {
  return axios({
    method: "post",
    url: `${BASE_URL}/forgotPassword`,
    data: payload,
  });
};

const resetPassword = (payload, token) => {
  return axios({
    method: "post",
    url: `${BASE_URL}/reset-password/${token}`,
    data: payload,
  });
};

const logout = () => {
  return axios({
    method: "get",
    url: `${BASE_URL}/logout`,
  });
};

export default {
  register,
  login,
  forgotPassword,
  resetPassword,
  logout,
};
