import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import ContentService from "../services/content.service";
const ModContent = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    ContentService.getModContent().then(
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

export default ModContent;