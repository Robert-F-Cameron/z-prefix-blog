import React, { useState, useEffect, useCallback } from "react";
import EditBlogPost from "./EditBlogPost";
import AuthService from "../../services/auth.service";
import userService from "../../services/user.service";
import ContentService from "../../services/content.service";
import { Container, Button, Modal, Row } from "react-bootstrap";

export default function BlogPost(props) {
  const [fullscreen, setFullscreen] = useState(true);
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [author, setAuthor] = useState("");
  const handleClose = () => setShow(false);
  const handleEdit = () => {
    if (edit === true) {setEdit(false); props.fetch()}
    else setEdit(true)
  };
  const handleDelete = () => {
    ContentService.deleteBlogPost(
      props.data.id
    );
    props.fetch()
    handleClose()
  }
  const handleShow = breakpoint => {
    setFullscreen(breakpoint);
    setShow(true);
  };
  const content = () => {
    if (!edit) {
      return (
        <Container>
          <Row>Author: {`${author.firstName} ${author.lastName}`}</Row>
          <Row>{props.data.contents}</Row>
        </Container>
      );
    } else {
      return <EditBlogPost data={props.data} edit={handleEdit}/>;
    }
  };
  const fetchData = useCallback(async () => {
    var postAuthor = await userService.getSingleUser(props.data.userId);
    setUser(AuthService.getCurrentUser());
    if (!postAuthor.data) {
      setAuthor("Oops! No Author Saved!");
    } else {
      setAuthor(postAuthor.data);
    }
  }, [props.data]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <Container>
      <Button variant="primary" onClick={handleShow}>
        View Full Post
      </Button>

      <Modal show={show} onHide={handleClose} fullscreen={fullscreen}>
        <Modal.Header closeButton>
          <Modal.Title>{props.data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content()}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            hidden={
              user === null
                ? true
                : user.id === props.data.userId
                ? false
                : true
            }
            onClick={handleDelete}
          >
            Delete Post
          </Button>
          <Button
            variant="primary"
            hidden={
              user === null
                ? true
                : user.id === props.data.userId
                ? false
                : true
            }
            onClick={handleEdit}
          >
            Edit Post
          </Button>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
