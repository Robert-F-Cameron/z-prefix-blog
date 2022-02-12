import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { BlogPostCard } from "./blog/BlogPostCard";
import NewBlogPost from "./blog/NewBlogPost"
import ContentService from "../services/content.service";
const UserContent = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    ContentService.getPublicContent().then(
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

  const displayBlogPosts = () => {
    if (!content.length) {
      return "No Posts Found!";
    } else {
      return content.map(post => <BlogPostCard data={post} key={post.id} />);
    }
  };
  return (
    <Container>
      <NewBlogPost />
      {displayBlogPosts()}
    </Container>
    );
};
export default UserContent;
