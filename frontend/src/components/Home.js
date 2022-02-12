import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import ContentService from "../services/content.service";
import { BlogPostCard } from "./blog/BlogPostCard";
const Home = () => {
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
      return content.map(post => (
        <BlogPostCard
          data={post}
          key={post.id}
        />
      ));
    }
  };
  return displayBlogPosts();
};
export default Home;
