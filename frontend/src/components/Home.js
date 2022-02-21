import React, { useState, useEffect, useCallback } from "react";
import { Container } from "react-bootstrap";
import ContentService from "../services/content.service";
import { BlogPostCard } from "./blog/BlogPostCard";
const Home = () => {
  const [content, setContent] = useState("");
  const fetchData = useCallback(async () => {
    console.log("Fetched!")
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
  },[])
  useEffect(() => {
    fetchData();
  }, []);

  const displayBlogPosts = () => {
    if (!content.length) {
      return "No Posts Found!";
    } else {
      return content.map(post => (
        <BlogPostCard
          data={post}
          fetch = {fetchData}
          key={post.id}
        />
      ));
    }
  };
  return displayBlogPosts();
};
export default Home;
