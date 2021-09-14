import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCashRegister,
  faChartLine,
  faUsers,
  faFilePdf,
  faListUl,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Button,
  Dropdown,
  ButtonGroup,
  Image,
} from "@themesberg/react-bootstrap";

import { CounterWidget, CircleChartWidget } from "../../components/Widgets";

import DashboardService from "../../services/dashboard.services";
import imageEvent from "../../assets/img/1585488022941.jpg";

export default () => {
  const [users, setUsers] = useState(Number);
  const [events, setEvents] = useState(Number);
  const [tickets, setTickets] = useState(Number);

  let usersPr = 0;
  let eventsPr = 0;
  let ticketsPr = 0;
  let total = users + events + tickets;
  usersPr = (users / total) * 100;
  eventsPr = (events / total) * 100;
  ticketsPr = (tickets / total) * 100;

  const trafficShares = [
    {
      id: 1,
      label: "Users",
      value: parseInt(usersPr, 10),
      color: "tertiary",
      icon: faUsers,
    },
    {
      id: 2,
      label: "Tickets",
      value: parseInt(ticketsPr, 10),
      color: "secondary",
      icon: faFilePdf,
    },
    {
      id: 3,
      label: "Events",
      value: parseInt(eventsPr, 10),
      color: "primary",
      icon: faListUl,
    },
  ];

  useEffect(() => {
    DashboardService.getAllStats().then((response) => {
      console.log(response.data);
      setUsers(response.data.users);
      setEvents(response.data.events);
      setTickets(response.data.tickets);
    });
  }, []);
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4"></div>

      <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4 d-none d-sm-block">
          <Image src={imageEvent} className="img-fluid rounded" />
        </Col>
        <Col xs={12} className="mb-4 d-sm-none"></Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Events"
            title={`${events} events`}
            period="Feb 1 - Apr 1"
            percentage={18.2}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Tickets"
            title={`${tickets} tickets`}
            period="Feb 1 - Apr 1"
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CircleChartWidget title="Traffic Share" data={trafficShares} />
        </Col>
      </Row>
    </>
  );
};
