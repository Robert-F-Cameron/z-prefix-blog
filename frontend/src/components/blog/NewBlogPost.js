import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Modal,
  InputGroup,
  FormControl,
} from "react-bootstrap";
export default function Checklist(props) {
  const [show, setShow] = useState(false);

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
          <InputGroup>
            <InputGroup.Text>Title</InputGroup.Text>
            <FormControl as="text" aria-label="Title" id="title" />
          </InputGroup>
          <InputGroup>
            <InputGroup.Text>Post</InputGroup.Text>
            <FormControl as="textarea" aria-label="Blog Post Body" id="body" />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
