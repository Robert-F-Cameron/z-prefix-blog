import React from "react";
import AuthService from "../services/auth.service";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Formik } from "formik";
import * as yup from "yup";

// Schema for yup
const validationSchema = yup.object().shape({
  username: yup.string().required("Required"),
  password: yup.string().required("Required"),
});

const Login = props => {
  return (
    <Container>
      {/* //Sets initial values for form inputs */}
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log("Submitting");
          // When button submits form and form is in the process of submitting, submit button is disable
          setSubmitting(true);
          AuthService.login(values.username, values.password)
            .then(
              response => {},
              error => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
                console.log(resMessage);
                resetForm();
                setSubmitting(false);
              }
            )
            .then(() => {
              window.location.href = "/";
            });
        }}
      >
        {/* Callback function containing Formik state and helpers that handle common form actions */}
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form noValidate onSubmit={handleSubmit} className="mx-auto">
            <Form.Group controlId="formUsername">
              <Form.Label>Username :</Form.Label>
              <Form.Control
                type="text"
                /* This name property is used to access the value of the form element via values.nameOfElement */
                name="username"
                placeholder="Username"
                /* Set onChange to handleChange */
                onChange={handleChange}
                /* Set onBlur to handleBlur */
                onBlur={handleBlur}
                /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                value={values.username}
                /* Check if the name field (this field) has been touched and if there is an error, if so add the .error class styles defined in the CSS (make the input box red) */
                // className={touched.username && errors.username ? "error" : null}
              />
              {/* Applies the proper error message from validateSchema when the user has clicked the element and there is an error, also applies the .error-message CSS class for styling */}
              {touched.username && errors.username ? (
                <div className="error-message">{errors.username}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password :</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                // className={touched.password && errors.password ? "error" : null}
              />
              {touched.password && errors.password ? (
                <div className="error-message">{errors.password}</div>
              ) : null}
            </Form.Group>

            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
export default Login;
