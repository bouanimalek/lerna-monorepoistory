import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// get all tags
const getAllTags = () => {
  return axios({
    method: "get",
    url: `${BASE_URL}/tags`,
  });
};

// get tag by id
const getTagById = (id) => {
  return axios({
    method: "get",
    url: `${BASE_URL}/tags/${id}`,
  });
};

// create tag
const createTag = (payload) => {
  return axios({
    method: "post",
    url: `${BASE_URL}/tags`,
    data: payload,
  });
};

// modify tag
const modifyTag = (payload, id) => {
  return axios({
    method: "put",
    url: `${BASE_URL}/tags/${id}`,
    data: payload,
  });
};

// delete tag
const deleteTag = (id) => {
  return axios({
    method: "delete",
    url: `${BASE_URL}/tags/${id}`,
  });
};

export default {
  getAllTags,
  getTagById,
  createTag,
  modifyTag,
  deleteTag,
};
