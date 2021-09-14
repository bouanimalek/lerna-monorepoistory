import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
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
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Image,
  Button,
  Dropdown,
  Table,
} from "@themesberg/react-bootstrap";
import { ChoosePhotoWidget, ProfileCardWidget } from "../../components/Widgets";
import { GeneralInfoForm } from "../../components/Forms";
import UserService from "../../services/user.services";
import Profile3 from "../../assets/img/team/profile-picture-3.jpg";
import { Fragment } from "react";
import showDeleteConfirmation from "../../services/sweetAlert.services";

export default (props) => {
  let count = 0;
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState();
  useEffect(() => {
    refreshList();
    const currentUserId_ = UserService.getAuthenticatedUserId();
    setCurrentUserId(currentUserId_);
  }, []);

  const refreshList = () => {
    UserService.getAllUsers()
      .then((response) => {
        setUsers(response.data);

        //console.log(users);
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
            // Swal.fire("User Deleted!", "", "success");
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
        <Col xs={12} xl={12}>
          <Card border="light" className="shadow-sm mb-4">
            <Card.Body className="pb-0">
              <h5 className="mb-4">List Users</h5>
              <Table
                responsive
                className="table-centered table-nowrap rounded mb-0"
              >
                <thead className="thead-light">
                  <tr>
                    <th className="border-0">First Name</th>
                    <th className="border-0">Last Name</th>
                    <th className="border-0 text-center">Email</th>
                    <th className="border-0">Phone Number</th>
                    <th className="border-0 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    return (
                      <Fragment key={user._id}>
                        <tr>
                          <td>{user.firstname}</td>
                          <td>{user.lastname}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>
                            {" "}
                            <div className="d-flex justify-content-center">
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
                            </div>
                          </td>
                        </tr>
                      </Fragment>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
