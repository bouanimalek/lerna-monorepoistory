import React, { useState, useEffect, Fragment } from "react";
import HomeService from "../../services/home.services";
import moment from "moment";
import Datatable from "react-bs-datatable";
import {
  Col,
  Row,
  Card,
  Image,
  Button,
  Dropdown,
  Table,
} from "@themesberg/react-bootstrap";
import showDeleteConfirmation from "../../services/sweetAlert.services";
import EventService from "../../services/event.services";
import { toast } from "react-toastify";

export default (props) => {
  const [events, setEvents] = useState([]);

  const refreshList = () => {
    EventService.getAllEvents()
      .then((response) => {
        console.log(response.data);
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    refreshList();
  }, []);

  const header = [
    {
      title: "Name",
      prop: "name",
      sortable: true,
      filterable: true,
    },
    {
      title: "Description",
      prop: "description",
      sortable: true,
      filterable: true,
    },
    { title: "Location", prop: "location", sortable: true, filterable: true },
    {
      title: "Start Date",
      prop: "startDate",
      sortable: true,
      filterable: true,
    },
    {
      title: "End Date",
      prop: "endDate",
      sortable: true,
      filterable: true,
    },
    {
      title: "Actions",
      prop: "action",
    },
  ];

  const onSortFunction = {
    date(columnValue) {
      // Convert the string date format to UTC timestamp
      // So the table could sort it by number instead of by string
      return moment(columnValue, "Do MMMM YYYY").valueOf();
    },
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
                <Col sm={9}>
                  <h5 className="mb-4">List Events</h5>
                </Col>
                <Col sm={3}>
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
              <Datatable
                tableHeaders={header}
                tableBody={events.map((event) => {
                  return {
                    name: event.name,
                    description: `${event.description.substring(0, 20)} ...`,
                    location: event.location,
                    startDate: `${moment(event.startDateTime).format(
                      "DD/MM/YYYY hh:mm"
                    )}`,
                    endDate: `${moment(event.endDateTime).format(
                      "DD/MM/YYYY hh:mm"
                    )}`,
                    action: (
                      <>
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
                      </>
                    ),
                  };
                })}
                rowsPerPage={10}
                initialSort={{ prop: "name", isAscending: true }}
                onSort={onSortFunction}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
