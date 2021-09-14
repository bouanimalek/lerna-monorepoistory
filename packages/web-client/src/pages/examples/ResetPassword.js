import React, { useState } from "react";
import AuthService from "../../services/auth.services";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  Container,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { Link, useParams } from "react-router-dom";

import { Routes } from "../../routes";

export default (props) => {
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordRequired, setPasswordRequired] = useState(null);
  const [confirmPasswordRequired, setConfirmPasswordRequired] = useState(null);
  const { token } = useParams();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const isValid = () => {
    if (!password) {
      setPasswordRequired("password is required!");
      setConfirmPasswordRequired(null);
    } else if (!confirmPassword) {
      setConfirmPasswordRequired("confirm password is required!");
      setPasswordError(null);
    } else if (password !== confirmPassword) {
      setPasswordError("Password doesnt match!");
      setPasswordRequired(null);
      setConfirmPasswordRequired(null);
      return false;
    } else {
      setPasswordRequired(null);
      setPasswordError(null);
      return true;
    }
  };
  const handlePasswordReset = () => {
    const validFun = isValid();
    console.log(validFun);
    if (validFun) {
      console.log(token);
      AuthService.resetPassword({ password }, token)
        .then((response) => {
          toast.success(response.data.message);
          props.history.push("/sign-in");
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
        });
    }
  };
  return (
    <main>
      <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center">
            <p className="text-center">
              <Card.Link
                as={Link}
                to={Routes.Signin.path}
                className="text-gray-700"
              >
                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to
                sign in
              </Card.Link>
            </p>
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3 className="mb-4">Reset password</h3>
                <Form>
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Your Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        onChange={handlePasswordChange}
                      />
                      <div className="text-start w-100 invalid-feedback d-block">
                        {passwordRequired}
                      </div>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="confirmPassword" className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="password"
                        placeholder="Confirm Password"
                        onChange={handleConfirmPasswordChange}
                      />
                      <div className="text-start w-100 invalid-feedback d-block">
                        {passwordError}
                        {confirmPasswordRequired}
                      </div>
                    </InputGroup>
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="button"
                    onClick={handlePasswordReset}
                    className="w-100"
                  >
                    Reset password
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
