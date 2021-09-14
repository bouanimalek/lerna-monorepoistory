import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Image,
  Form,
  Button,
  InputGroup,
  FormGroup,
} from "@themesberg/react-bootstrap";
import Profile3 from "../../assets/img/team/profile-picture-3.jpg";
import EventImage from "../../assets/img/events.jpg";
import EventService from "../../services/event.services";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
// import Select from "react-select-2";
// // Be sure to include styles at some point, probably during your bootstrapping
// import "react-select-2/dist/css/react-select-2.css";
import Select from "react-select";
import TagService from "../../services/tag.services";
import makeAnimated from "react-select/animated";

export const AddEventForm = () => {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    TagService.getAllTags()
      .then((response) => {
        console.log(response.data);
        const tagOptions = response.data.map((tag) => {
          return { value: tag._id, label: tag.name };
        });
        console.log(tagOptions);
        setTags(tagOptions);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [availableTicketNumber, setAvailableTicketNumber] = useState(Number);
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [eventType, setEventType] = useState("free");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [tag_, setTag_] = useState([]);
  // validation
  const [nameRequired, setNameRequired] = useState("");
  const [descriptionRequired, setDescriptionRequired] = useState("");
  const [priceRequired, setPriceRequired] = useState("");
  const [availableTicketNumberRequired, setAvailableTicketNumberRequired] =
    useState("");
  const [imageRequired, setImageRequired] = useState("");
  const [addressRequired, setAddressRequired] = useState("");
  const [eventTypeRequired, setEventTypeRequired] = useState("");
  const [startDateRequired, setStartDateRequired] = useState("");
  const [endDateRequired, setEndDateRequired] = useState("");
  const [tag_Required, setTag_Required] = useState("");

  // const startDateTime = new Date(startDate.valueOf()).toLocaleDateString(
  //   "fr-CA",
  //   {
  //     year: "numeric",
  //     month: "2-digit",
  //     day: "2-digit",
  //     hour: "numeric",
  //     minute: "numeric",
  //   }
  // );
  // const endDateTime = new Date(endDate.valueOf()).toLocaleDateString("fr-CA", {
  //   year: "numeric",
  //   month: "2-digit",
  //   day: "2-digit",
  //   hour: "numeric",
  //   minute: "numeric",
  // });

  const data = new FormData();
  data.append("name", name);
  data.append("description", description);
  data.append("price", price);
  data.append("availableTicketNumber", availableTicketNumber);
  data.append("location", address);
  data.append("startDateTime", startDate.toISOString());
  data.append("endDateTime", endDate.toISOString());
  data.append("images", image);
  data.append("tags", JSON.stringify(tag_));
  data.append("eventType", eventType);

  const validate = () => {
    let isValidForm = false;
    if (!name) {
      setNameRequired("Name is required!");
    } else {
      setNameRequired(null);
    }
    if (!description) {
      setDescriptionRequired("Description is required!");
    } else {
      setDescriptionRequired(null);
    }
    if (!price) {
      setPriceRequired("Price is required!");
    } else {
      setPriceRequired(null);
    }
    if (!availableTicketNumber) {
      setAvailableTicketNumberRequired("Available tickets is required!");
    } else {
      setAvailableTicketNumberRequired(null);
    }
    if (!image) {
      setImageRequired("Image is required!");
    } else {
      setImageRequired(null);
    }
    if (!address) {
      setAddressRequired("Address is required!");
    } else {
      setAddressRequired(null);
    }
    if (!startDate) {
      setStartDateRequired("Start date is required!");
    } else {
      setStartDateRequired(null);
    }
    if (!endDate) {
      setEndDateRequired("End date is required!");
    } else {
      setEndDateRequired(null);
    }
    if (!eventType) {
      setEventTypeRequired("Event type is required!");
    } else {
      setEventTypeRequired(null);
    }
    if (!tag_) {
      setTag_Required("Tag is required!");
    } else {
      setTag_Required(null);
    }
    if (
      name &&
      description &&
      price &&
      availableTicketNumber &&
      image &&
      address &&
      startDate &&
      endDate &&
      eventType &&
      tag_
    ) {
      isValidForm = true;
    }
    return isValidForm;
  };

  let history = useHistory();

  const handleSave = () => {
    const isValid = validate();
    if (isValid) {
      console.log(startDate.toISOString());
      EventService.createEvent(data)
        .then((response) => {
          console.log(response.data);
          console.log({ startDate, endDate });
          toast.success("Event created successfully!");
          history.push("/events");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Internal server error");
          //console.log(name, description, price, startDate.toString(), address);
        });
    }
  };
  const animatedComponents = makeAnimated();

  const handleChangeTag = (options) => {
    setTag_(options);
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Add New Event</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="name">
                <Form.Label>Event Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your event name"
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="text-start w-100 invalid-feedback d-block">
                  {nameRequired}
                </div>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="description">
                <Form.Label>Event Description</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  placeholder="Enter event description"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="text-start w-100 invalid-feedback d-block">
                  {descriptionRequired}
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="startDate">
                <Form.Label>Start Date</Form.Label>
                <Datetime
                  timeFormat={false}
                  timeFormat="HH:mm"
                  viewMode="time"
                  timeConstraints={{
                    hours: { min: 0, max: 23 },
                    minutes: { step: 1 },
                  }}
                  onChange={setStartDate}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={
                          startDate
                            ? moment(startDate).format("DD/MM/YYYY")
                            : ""
                        }
                        placeholder="dd/mm/yyyy"
                        onFocus={openCalendar}
                        onChange={() => {}}
                      />
                      <div className="text-start w-100 invalid-feedback d-block">
                        {startDateRequired}
                      </div>
                    </InputGroup>
                  )}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="endDate">
                <Form.Label>End Date</Form.Label>
                <Datetime
                  timeFormat={false}
                  timeFormat="HH:mm"
                  viewMode="time"
                  timeConstraints={{
                    hours: { min: 0, max: 23 },
                    minutes: { step: 1 },
                  }}
                  onChange={setEndDate}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={
                          endDate ? moment(endDate).format("DD/MM/YYYY") : ""
                        }
                        placeholder="dd/mm/yyyy"
                        onFocus={openCalendar}
                        onChange={() => {}}
                      />
                      <div className="text-start w-100 invalid-feedback d-block">
                        {endDateRequired}
                      </div>
                    </InputGroup>
                  )}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="12 €"
                  onChange={(e) => setPrice(e.target.value)}
                />
                <div className="text-start w-100 invalid-feedback d-block">
                  {priceRequired}
                </div>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="availableTicketNumber">
                <Form.Label>Number of tickets</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="0"
                  onChange={(e) => setAvailableTicketNumber(e.target.value)}
                />
                <div className="text-start w-100 invalid-feedback d-block">
                  {availableTicketNumberRequired}
                </div>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                  <h5 className="mb-4">Select event photo</h5>
                  <div className="d-xl-flex align-items-center">
                    <div className="user-avatar xl-avatar">
                      <Image
                        fluid
                        rounded
                        src={image ? URL.createObjectURL(image) : EventImage}
                      />
                    </div>
                    <div className="file-field">
                      <div className="d-flex justify-content-xl-center ms-xl-3">
                        <div className="d-flex">
                          <span className="icon icon-md">
                            <FontAwesomeIcon
                              icon={faPaperclip}
                              className="me-3"
                            />
                          </span>
                          <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                          />
                          <div className="d-md-block text-start">
                            <div className="fw-normal text-dark mb-1">
                              Choose Image
                            </div>
                            <div className="text-gray small">
                              JPG, GIF or PNG. Max size of 800K
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
                <div className="text-start w-100 invalid-feedback d-block">
                  {imageRequired}
                </div>
              </Card>
            </Col>
            <Col sm={6} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  placeholder="Enter your home address"
                  onChange={(e) => setAddress(e.target.value)}
                />
                <div className="text-start w-100 invalid-feedback d-block">
                  {addressRequired}
                </div>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="type" className="mb-4">
                <Form.Label>Type</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setEventType(e.target.value)}
                >
                  <option value="free" selected>
                    Free
                  </option>
                  <option value="paid">Paid</option>
                </Form.Select>
                <div className="text-start w-100 invalid-feedback d-block">
                  {eventTypeRequired}
                </div>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="type" className="mb-4">
                <Form.Label>Tags</Form.Label>
                <Select
                  isMulti
                  options={tags}
                  value={tag_}
                  onChange={handleChangeTag}
                />
                <div className="text-start w-100 invalid-feedback d-block">
                  {tag_Required}
                </div>
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-3">
            <Button variant="primary" type="button" onClick={handleSave}>
              <i className="fa fa-save"></i> Save
            </Button>
            <Button
              variant="primary ms-1"
              type="button"
              onClick={() => history.push("/events")}
            >
              {" "}
              <i className="fa fa-undo"></i> Cancel
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
