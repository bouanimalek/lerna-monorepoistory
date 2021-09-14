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
import TicketService from "../../services/ticket.services";
import { toast } from "react-toastify";
import ViewTicket from "./ViewTicket";

export default (props) => {
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    TicketService.getAllTickets()
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const header = [
    {
      title: "Owner",
      prop: "owner",
      sortable: true,
      filterable: true,
    },
    {
      title: "Event",
      prop: "event",
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

  const refreshList = () => {
    TicketService.getAllTickets()
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    showDeleteConfirmation("ticket").then((result) => {
      if (result.isConfirmed) {
        TicketService.deleteTicketById(id)
          .then((response) => {
            //console.log(response);
            //Swal.fire("Event Deleted!", "", "success");
            setTickets(tickets);
            toast.success("Ticket deleted successfully!");
            refreshList();
          })
          .catch((error) => {
            console.log(error);
            toast.error("Internal server error");
          });
      }
    });
  };

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const [modalShow, setModalShow] = useState(false);
  const handleViewTicket = (id) => {
    setModalShow(true);
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
                  <h5 className="mb-4">List Tickets</h5>
                </Col>
              </Row>
              <Datatable
                tableHeaders={header}
                tableBody={tickets.map((ticket) => {
                  return {
                    owner: `${ticket.owner.firstname} ${ticket.owner.lastname}`,
                    event: ticket.event.name,

                    action: (
                      <>
                        <Button
                          variant="info me-1"
                          type="button"
                          size="sm"
                          onClick={handleViewTicket.bind(this, ticket._id)}
                        >
                          <i className="fa fa-file-pdf"></i> View Ticket
                        </Button>
                        <ViewTicket
                          path={ticket.ticketPath}
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                        />
                        <Button
                          variant="primary"
                          type="button"
                          size="sm"
                          onClick={handleDelete.bind(this, ticket._id)}
                        >
                          <i className="fa fa-trash"></i> Delete
                        </Button>
                      </>
                    ),
                  };
                })}
                rowsPerPage={10}
                initialSort={{ prop: "firstname", isAscending: true }}
                onSort={onSortFunction}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
