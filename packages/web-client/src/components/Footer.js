import React from "react";
import moment from "moment-timezone";
import {
  Row,
  Col,
  Card,
  OverlayTrigger,
  Tooltip,
  Image,
  Button,
} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCogs,
  faDownload,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import BS5Logo from "../assets/img/technologies/bootstrap-5-logo.svg";
import ReactLogo from "../assets/img/technologies/react-logo.svg";
import LaravelLogo from "../assets/img/technologies/laravel-logo.svg";
import GitHubButton from "react-github-btn";
import { Link } from "react-router-dom";
import { Routes } from "../routes";

export default (props) => {
  const currentYear = moment().get("year");

  return (
    <div className="d-flex justify-content-center ">
      <footer>
        <Row>
          <Col xs={12} lg={12} className="mb-4 mb-lg-0 d-flex">
            <p className="mb-0 text-center text-xl-left mt-auto">
              Copyright © 2021-{`${currentYear} `}
              <Card.Link
                href="https://fivepoints.fr"
                target="_blank"
                className="text-blue text-decoration-none fw-normal"
              >
                Fivepoints Theme
              </Card.Link>
            </p>
          </Col>
        </Row>
      </footer>
    </div>
  );
};
