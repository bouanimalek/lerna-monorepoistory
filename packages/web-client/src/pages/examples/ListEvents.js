import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faCartArrowDown,
  faChartPie,
  faChevronDown,
  faClipboard,
  faCommentDots,
  faFileAlt,
  faPlus,
  faRocket,
  faStore,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Image,
  Button,
  Dropdown,
  Table,
} from "@themesberg/react-bootstrap";
import { ChoosePhotoWidget, ProfileCardWidget } from "../../components/Widgets";
import { GeneralInfoForm } from "../../components/Forms";
import EventService from "../../services/event.services";
import Profile3 from "../../assets/img/team/profile-picture-3.jpg";
import { Fragment } from "react";

import showDeleteConfirmation from "../../services/sweetAlert.services";

export default (props) => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = () => {
    EventService.getAllEvents()
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDelete = (id) => {
    showDeleteConfirmation("event").then((result) => {
      if (result.isConfirmed) {
        EventService.deleteEvent(id)
          .then((response) => {
            //console.log(response);
            //Swal.fire("Event Deleted!", "", "success");
            setEvents(events);
            refreshList();
          })
          .catch((error) => {
            console.log(error);
            toast.error("Internal server error");
          });
      }
    });
  };

  const handleEdit = (id) => {
    props.history.push(`/events/edit/${id}`);
  };
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4"></div>

      <Row>
        <Col xs={12} xl={12} md={12}>
          <Card border="light" className="shadow-sm mb-4">
            <Card.Body className="pb-0">
              <Row>
                <Col sm={10}>
                  <h5 className="mb-4">List Events</h5>
                </Col>
                <Col sm={2}>
                  <Button
                    className="float-end"
                    variant="info mb-4"
                    type="button"
                    onClick={() => props.history.push("/events/create")}
                  >
                    <i className="fa fa-plus"></i> Add New Event
                  </Button>
                </Col>
              </Row>

              <Table
                responsive
                className="table-centered table-nowrap rounded mb-0"
              >
                <thead className="thead-light">
                  <tr>
                    <th className="border-0">Name</th>
                    <th className="border-0">Description</th>
                    <th className="border-0">Start Date</th>
                    <th className="border-0">End Date</th>
                    <th className="border-0">Location</th>
                    <th className="border-0">Price</th>
                    <th className="border-0">Available Tickets</th>
                    <th className="border-0">Type</th>
                    <th className="border-0">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => {
                    return (
                      <Fragment key={event._id}>
                        <tr>
                          <td>{event.name}</td>
                          <td>{event.description}</td>
                          <td>{event.startDateTime}</td>
                          <td>{event.endDateTime}</td>
                          <td>{event.location}</td>
                          <td>{event.price}</td>
                          <td>{event.availableTicketNumber}</td>
                          <td>{event.eventType}</td>
                          <td>
                            {" "}
                            <Button
                              variant="info"
                              type="button"
                              size="sm"
                              className="me-1"
                              onClick={handleEdit.bind(this, event._id)}
                            >
                              <i className="fa fa-edit"></i> Edit
                            </Button>
                            <Button
                              variant="primary"
                              type="button"
                              size="sm"
                              onClick={handleDelete.bind(this, event._id)}
                            >
                              <i className="fa fa-trash"></i> Delete
                            </Button>
                          </td>
                        </tr>
                      </Fragment>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
