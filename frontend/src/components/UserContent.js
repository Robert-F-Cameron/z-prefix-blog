import React, { useState, useEffect, useCallback } from "react";
import { Container } from "react-bootstrap";
import { BlogPostCard } from "./blog/BlogPostCard";
import NewBlogPost from "./blog/NewBlogPost"
import ContentService from "../services/content.service";
const UserContent = () => {
  const [content, setContent] = useState("");
  const fetchData = useCallback(async () => {
    console.log("Fetched!");
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
  useEffect(() => {
    fetchData();
  }, []);

  const displayBlogPosts = () => {
    if (!content.length) {
      return "No Posts Found!";
    } else {
      return content.map(post => <BlogPostCard data={post} key={post.id} fetch={fetchData} />);
    }
  };
  return (
    <Container>
      <NewBlogPost fetch={fetchData}/>
      {displayBlogPosts()}
    </Container>
    );
};
export default UserContent;
