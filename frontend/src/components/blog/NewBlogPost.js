import React, { useState, useEffect, useCallback } from "react";
import {Formik} from 'formik';
import AuthService from "../../services/auth.service";
import ContentService from "../../services/content.service";
import {
  Container,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  title: yup.string().required("Required"),
  contents: yup.string().required("Required"),
  published: yup.bool(),
  userId: yup.string()
});

export default function NewBlogPost(props) {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  

useEffect(() => {
    setUser(AuthService.getCurrentUser());
  }, []);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
      <Button variant="primary" onClick={handleShow}>
        Create New Post
      </Button>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Create Blog Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              title: "",
              contents: "",
              published: false,
              userId: user.id,
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              // When button submits form and form is in the process of submitting, submit button is disable
              setSubmitting(true);
              console.log("userId:", user.id);
              console.log("Submitting");
              ContentService.postBlog(
                values.title,
                values.contents,
                values.published,
                user.id
              ).then(
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
              );
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
                <Form.Group controlId="formTitle">
                  <Form.Label>Title:</Form.Label>
                  <Form.Control
                    type="text"
                    /* This name property is used to access the value of the form element via values.nameOfElement */
                    name="title"
                    placeholder="Title"
                    /* Set onChange to handleChange */
                    onChange={handleChange}
                    /* Set onBlur to handleBlur */
                    onBlur={handleBlur}
                    /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                    value={values.title}
                    /* Check if the name field (this field) has been touched and if there is an error, if so add the .error class styles defined in the CSS (make the input box red) */
                    // className={touched.username && errors.username ? "error" : null}
                  />
                  {/* Applies the proper error message from validateSchema when the user has clicked the element and there is an error, also applies the .error-message CSS class for styling */}
                  {touched.title && errors.title ? (
                    <div className="error-message">{errors.title}</div>
                  ) : null}
                </Form.Group>
                <Form.Group controlId="formContents">
                  <Form.Label>Contents:</Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    style={{ height: "400px" }}
                    name="contents"
                    placeholder="Blog Content"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.contents}
                    // className={touched.password && errors.password ? "error" : null}
                  />
                  {touched.contents && errors.contents ? (
                    <div className="error-message">{errors.contents}</div>
                  ) : null}
                </Form.Group>
                <Form.Group controlId="formPublished">
                  <Form.Label>Published?</Form.Label>
                  <Form.Check
                    type="checkbox"
                    name="published"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.published}
                    // className={touched.password && errors.password ? "error" : null}
                  />
                  {touched.published && errors.published ? (
                    <div className="error-message">{errors.published}</div>
                  ) : null}
                </Form.Group>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit" onClick={handleClose}>
                  Save Changes
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </Container>
  );
}
