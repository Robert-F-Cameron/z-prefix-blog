import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { Button, Container, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

  const schema = yup.object().shape({
    username: yup
      .string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    firstName: yup
      .string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    LastName: yup
      .string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: yup.string().email("Invalid email").required("Required"),
    password: yup
      .string()
      .min(2, "Too Short!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
        "Must have one uppercase letter, one lowercase letter, one number and one special character."
      )
      .required("Required"),
  });

const Register = () => {
  return (
    <Container>
      <Formik
        initialValues={{
          username: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          // When button submits form and form is in the process of submitting, submit button is disabled
          setSubmitting(true);

          // Simulate submitting to database, shows us values submitted, resets form
          AuthService.register(
            values.username,
            values.firstName,
            values.lastName,
            values.email,
            values.password,
            ["user"]
          ).then(
            response => {},
            error => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
            }
          );
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="validationFormik01">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                isValid={touched.username && !errors.username}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationFormik02">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                isValid={touched.firstName && !errors.firstName}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationFormik03">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                isValid={touched.lastName && !errors.lastName}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationFormik04">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                isValid={touched.email && !errors.email}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationFormik05">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                name="password"
                value={values.password}
                onChange={handleChange}
                isValid={touched.password && !errors.password}
              />
            </Form.Group>
            <Button type="submit">Submit form</Button>
          </Form>
        )}
        ;
      </Formik>
    </Container>
  );
};
export default Register;