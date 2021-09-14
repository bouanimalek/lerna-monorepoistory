import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// get all events
const getAllEvents = () => {
  return axios({
    method: "get",
    url: `${BASE_URL}/events`,
  });
};

// create event
const createEvent = (payload) => {
  return axios({
    method: "post",
    url: `${BASE_URL}/events`,
    data: payload,
  });
};

// get event by id
const getEventById = (id) => {
  return axios({
    method: "get",
    url: `${BASE_URL}/events/${id}`,
  });
};

// modify event
const modifyEvent = (payload, id) => {
  return axios({
    method: "put",
    url: `${BASE_URL}/events/${id}`,
    data: payload,
  });
};

// delete event
const deleteEvent = (id) => {
  return axios({
    method: "delete",
    url: `${BASE_URL}/events/${id}`,
  });
};

// affect author to event
const affectAuthorToEvent = (idEvent, idUser) => {
  return axios({
    method: "post",
    url: `${BASE_URL}/events/affectAuthorToEvent/${idEvent}/${idUser}`,
  });
};

// desAffect author from event
const desAffectAuthorEvent = (idEvent) => {
  return axios({
    method: "post",
    url: `${BASE_URL}/events/desAffectAuthor/${idEvent}`,
  });
};

// affect tag to event
const affectTagEvent = (idEvent, idTag) => {
  return axios({
    method: "post",
    url: `${BASE_URL}/events/affectTagToEvent/${idEvent}/${idTag}`,
  });
};

// desAffect tag from event
const desAffectTagEvent = (idEvent, idTag) => {
  return axios({
    method: "post",
    url: `${BASE_URL}/events/desAffectTag/${idEvent}/${idTag}`,
  });
};

// get event with author
const getEventWithAuthor = (id) => {
  return axios({
    method: "get",
    url: `${BASE_URL}/events/getEventWithAuthor/${id}`,
  });
};

// get all events with authors
const getAllEventsWithAllAuthor = () => {
  return axios({
    method: "get",
    url: `${BASE_URL}/events/getAllEventsWithAuthor`,
  });
};

// get event with tags
const getEventWithTags = (id) => {
  return axios({
    method: "get",
    url: `${BASE_URL}/events/getEventWithTags/${id}`,
  });
};

// get all events with all tags
const getAllEventsWithAllTags = () => {
  return axios({
    method: "get",
    url: `${BASE_URL}/events/getAllEventsWithTags`,
  });
};

export default {
  getAllEvents,
  createEvent,
  getEventById,
  modifyEvent,
  deleteEvent,
  affectAuthorToEvent,
  desAffectAuthorEvent,
  affectTagEvent,
  desAffectTagEvent,
  getEventWithAuthor,
  getAllEventsWithAllAuthor,
  getEventWithTags,
  getAllEventsWithAllTags,
};
