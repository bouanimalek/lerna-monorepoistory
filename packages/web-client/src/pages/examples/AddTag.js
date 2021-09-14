import React, { useState } from "react";
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
} from "@themesberg/react-bootstrap";
import Profile3 from "../../assets/img/team/profile-picture-3.jpg";
import TagService from "../../services/tag.services";
import { toast } from "react-toastify";

export default (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameRequired, setNameRequired] = useState("");
  const [descriptionRequired, setDescriptionRequired] = useState("");

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
    if (name && description) {
      isValidForm = true;
    }
    return isValidForm;
  };

  const handleSave = () => {
    const isValid = validate();
    if (isValid) {
      TagService.createTag({ name, description })
        .then((response) => {
          console.log(response.data);
          toast.success("Tag created successfully!");
          setName("");
          setDescription("");
          props.history.push("/tags");
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
          //console.log(name, description, price, startDate.toString(), address);
        });
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4"></div>
      <Row>
        <Col xs={12} xl={12}>
          <Card border="light" className="bg-white shadow-sm mb-4 ">
            <Card.Body>
              <h5 className="mb-4">Add New Tag</h5>
              <Form>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group id="name">
                      <Form.Label>Tag Name</Form.Label>
                      <InputGroup>
                        <Form.Control
                          required
                          type="text"
                          value={name}
                          placeholder="Enter your tag name"
                          onChange={(e) => setName(e.target.value)}
                        />
                        <div className="text-start w-100 invalid-feedback d-block">
                          {nameRequired}
                        </div>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="description">
                      <Form.Label>Tag Description</Form.Label>
                      <InputGroup>
                        <Form.Control
                          required
                          as="textarea"
                          value={description}
                          placeholder="Enter tag description"
                          onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className="text-start w-100 invalid-feedback d-block">
                          {descriptionRequired}
                        </div>
                      </InputGroup>
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
                    onClick={() => props.history.push("/tags")}
                  >
                    {" "}
                    <i className="fa fa-undo"></i> Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
