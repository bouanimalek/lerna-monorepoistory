import React, { useEffect, useState, Fragment, useCallback } from "react";
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
  faAngleLeft,
  faEnvelope,
  faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Image,
  Button,
  Dropdown,
  Table,
  Form,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { ChoosePhotoWidget, ProfileCardWidget } from "../../components/Widgets";
import { GeneralInfoForm } from "../../components/Forms";
import TagService from "../../services/tag.services";
import Profile3 from "../../assets/img/team/profile-picture-3.jpg";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export default (props) => {
  const [tag, setTag] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameRequired, setNameRequired] = useState("");
  const [descriptionRequired, setDescriptionRequired] = useState("");
  const { idTag } = useParams();
  const history = useHistory();

  useEffect(() => {
    TagService.getTagById(idTag)
      .then((response) => {
        setTag(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const handleName = (e) => {
  //   setName(e.target.value);
  // };

  // const handleDescription = (e) => {
  //   setTag({ ...tag, description: e.target.value });
  //   console.log(e.target.value);
  // };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTag({ ...tag, [name]: value });
  };

  const validate = () => {
    let isValidForm = false;
    if (!tag.name) {
      setNameRequired("Name is required!");
    } else {
      setNameRequired(null);
    }
    if (!tag.description) {
      setDescriptionRequired("Description is required!");
    } else {
      setDescriptionRequired(null);
    }
    if (tag.name && tag.description) {
      isValidForm = true;
    }
    return isValidForm;
  };
  const handleReset = () => {
    const isValid = validate();
    if (isValid) {
      TagService.modifyTag(tag, idTag)
        .then((response) => {
          console.log(response);
          toast.success("Tag updated successfully.");
          history.push("/tags");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4"></div>
      <Row>
        <Col xs={12} xl={12}>
          <Card border="light" className="shadow-sm mb-4">
            <Card.Body className="pb-0">
              <h5 className="mb-4">Edit Tag</h5>
              <Form>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group id="firstName" className="mb-4">
                      <Form.Label>Name</Form.Label>
                      <InputGroup>
                        <InputGroup.Text></InputGroup.Text>
                        <Form.Control
                          required
                          type="text"
                          value={tag ? tag.name : ""}
                          name="name"
                          onChange={handleInputChange}
                        />
                        <div className="text-start w-100 invalid-feedback d-block">
                          {nameRequired}
                        </div>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="lastName" className="mb-4">
                      <Form.Label>Description</Form.Label>
                      <InputGroup>
                        <InputGroup.Text></InputGroup.Text>
                        <Form.Control
                          required
                          as="textarea"
                          placeholder=""
                          value={tag ? tag.description : ""}
                          name="description"
                          onChange={handleInputChange}
                        />
                        <div className="text-start w-100 invalid-feedback d-block">
                          {descriptionRequired}
                        </div>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="mt-3 mb-1">
                  <Button variant="primary" type="button" onClick={handleReset}>
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
