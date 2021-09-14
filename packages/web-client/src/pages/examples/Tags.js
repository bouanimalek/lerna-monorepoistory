import React, { useState, useEffect, Fragment } from "react";

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
import TagService from "../../services/tag.services";
import { toast } from "react-toastify";

export default (props) => {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    TagService.getAllTags()
      .then((response) => {
        setTags(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
    TagService.getAllTags()
      .then((response) => {
        setTags(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    showDeleteConfirmation("tag").then((result) => {
      if (result.isConfirmed) {
        TagService.deleteTag(id)
          .then((response) => {
            //console.log(response);
            //Swal.fire("Event Deleted!", "", "success");
            setTags(tags);
            toast.success("Tag deleted successfully!");
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
    props.history.push(`/tags/edit/${id}`);
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
                  <h5 className="mb-4">List Tags</h5>
                </Col>
                <Col sm={3}>
                  <Button
                    className="float-end"
                    variant="info mb-4"
                    type="button"
                    onClick={() => props.history.push("/tags/create")}
                  >
                    <i className="fa fa-plus"></i> Add New Tag
                  </Button>
                </Col>
              </Row>
              <Datatable
                tableHeaders={header}
                tableBody={tags.map((tag) => {
                  return {
                    name: tag.name,
                    description: tag.description,
                    action: (
                      <div className="text-center">
                        <Button
                          variant="info"
                          type="button"
                          size="sm"
                          className="me-1"
                          onClick={handleEdit.bind(this, tag._id)}
                        >
                          <i className="fa fa-edit"></i> Edit
                        </Button>
                        <Button
                          variant="primary"
                          type="button"
                          size="sm"
                          onClick={handleDelete.bind(this, tag._id)}
                        >
                          <i className="fa fa-trash"></i> Delete
                        </Button>
                      </div>
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
