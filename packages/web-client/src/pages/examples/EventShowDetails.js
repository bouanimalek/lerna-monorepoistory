import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  Row,
  Col,
  Image,
  Card,
  Button,
  Container,
  Spinner,
} from "@themesberg/react-bootstrap";
import EventService from "../../services/event.services";
import ReservationService from "../../services/reservation.services";
import { toast } from "react-toastify";

const EventShowDetails = () => {
  const { idEvent } = useParams();
  const [event, setEvent] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    EventService.getEventById(idEvent)
      .then((response) => {
        console.log(response.data);
        setEvent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleReservation = (idEvent) => {
    setIsLoaded(false);
    ReservationService.createReservation(idEvent)
      .then((response) => {
        console.log(response);
        setIsLoaded(true);
        toast.success(
          "Thank you for your resevation! Please check your email!"
        );
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
        toast.error("Can not make reservation! Tickets are sold out!");
      });
  };
  return (
    <Container className="py-4">
      <Row>
        <Col xl={8}>
          <Image src={event.eventImage} className="img-fluid rounded" />
        </Col>
        <Col xl={4} className="d-flex align-items-stretch">
          <Card border="light" key={event._id} className="d-flex flex-column">
            <Card.Body>
              <Card.Title className="d-flex justify-content-center">
                {event.name}
              </Card.Title>
              <Card.Title className="d-flex justify-content-center">
                <span style={{ color: "grey" }}>
                  {" "}
                  by {event.author ? event.author.lastname : null}{" "}
                </span>{" "}
              </Card.Title>
              <Card.Text className="d-flex justify-content-center">
                {event.description}
              </Card.Text>
              <Button
                variant="primary"
                onClick={handleReservation.bind(this, idEvent)}
              >
                {!isLoaded ? (
                  <Spinner animation="border" variant="white" />
                ) : (
                  "Make reservation"
                )}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EventShowDetails;
