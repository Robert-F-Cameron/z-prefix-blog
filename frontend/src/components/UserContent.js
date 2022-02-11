import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import ContentService from "../services/content.service";
const UserContent = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    ContentService.getUserContent().then(
      response => {
        setContent(response.data);
      },
      error => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);
  return <Container>{content}</Container>;
};
export default UserContent;
