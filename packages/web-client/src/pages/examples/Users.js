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
import UserService from "../../services/user.services";
import { toast } from "react-toastify";

export default (props) => {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState();
  useEffect(() => {
    refreshList();
    const currentUserId_ = UserService.getAuthenticatedUserId();
    setCurrentUserId(currentUserId_);
  }, []);

  const header = [
    {
      title: "First Name",
      prop: "firstname",
      sortable: true,
      filterable: true,
    },
    {
      title: "Last Name",
      prop: "lastname",
      sortable: true,
      filterable: true,
    },
    { title: "email", prop: "email", sortable: true, filterable: true },
    {
      title: "Phone",
      prop: "phone",
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
    UserService.getAllUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    showDeleteConfirmation("user").then((result) => {
      if (result.isConfirmed) {
        UserService.deleteUser(id)
          .then((response) => {
            //console.log(response);
            //Swal.fire("Event Deleted!", "", "success");
            setUsers(users);
            toast.success("User deleted successfully!");
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
    props.history.push(`/users/edit/${id}`);
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
                  <h5 className="mb-4">List Users</h5>
                </Col>
              </Row>
              <Datatable
                tableHeaders={header}
                tableBody={users.map((user) => {
                  return {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    phone: user.phone,
                    action: (
                      <>
                        <Button
                          variant="info"
                          type="button"
                          size="sm"
                          className="me-1"
                          onClick={handleEdit.bind(this, user._id)}
                        >
                          <i className="fa fa-edit"></i> Edit
                        </Button>
                        {currentUserId !== user._id ? (
                          <Button
                            variant="primary"
                            type="button"
                            size="sm"
                            onClick={handleDelete.bind(this, user._id)}
                          >
                            <i className="fa fa-trash"></i> Delete
                          </Button>
                        ) : null}
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
