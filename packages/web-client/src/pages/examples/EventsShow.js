import React, { useState, useEffect } from "react";
import HomeService from "../../services/home.services";
import {
  Card,
  Button,
  Row,
  Col,
  Container,
  Badge,
} from "@themesberg/react-bootstrap";
import { useHistory, Link } from "react-router";
import moment from "moment";
import "../../../src/test.css";

const EventsShow = () => {
  let history = useHistory();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    HomeService.getAllEvents()
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEvent = (id) => {
    history.push(`/events/show/${id}`);
  };

  return (
    <Container className="py-4">
      <h5 className="mb-4">Evénements En ligne</h5>
      <Row className="g-4">
        {events.map((event) => {
          return (
            <Col xs={4} xl={3} key={event._id}>
              <Card
                style={{ cursor: "pointer" }}
                border="light"
                key={event._id}
                onClick={handleEvent.bind(this, event._id)}
                className="test"
              >
                <Card.Img variant="top" src={event.eventImage} />
                <Card.Body>
                  <Card.Title>
                    <Card.Link onClick={handleEvent.bind(this, event._id)}>
                      {event.name}
                    </Card.Link>
                  </Card.Title>
                  <Card.Text>
                    <u>Start Date</u>:
                    {` ${moment(event.startDateTime).format(
                      "DD/MM/YYYY HH:mm "
                    )}`}{" "}
                    - <u>End Date</u>:{" "}
                    {` ${moment(event.endDateTime).format(
                      "DD/MM/YYYY HH:mm "
                    )}`}
                  </Card.Text>
                  {event.eventType !== "free" ? (
                    <Card.Text>{event.price} €</Card.Text>
                  ) : (
                    <span
                      style={{ color: "#eb2f06", fontFamily: "sans-serif" }}
                    >
                      Free
                    </span>
                  )}

                  <Card.Text>
                    {event.author.firstname} {event.author.lastname}
                  </Card.Text>
                  <Card.Text>
                    {event.tags.map((tag, index) => (
                      <Badge
                        pill
                        bg="info"
                        key={index}
                        style={{ margin: "2px" }}
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </Card.Text>
                  {/* <Button
                    variant="primary"
                    onClick={handleEvent.bind(this, event._id)}
                  >
                    Go somewhere
                  </Button> */}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default EventsShow;
