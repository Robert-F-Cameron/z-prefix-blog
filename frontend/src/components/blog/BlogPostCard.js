import React, { useEffect, useState, useCallback } from "react";
import { Card } from "react-bootstrap";
import userService from "../../services/user.service";
import BlogPost from "./BlogPost";
const dateFormat = require("date-format");

function truncate(str, numWords) {
  return str.split(" ").splice(0, numWords).join(" ");
}

export function BlogPostCard(props) {
  const [author, setAuthor] = useState("");
  const fetchData = useCallback(async () => {
    var postAuthor = await userService.getSingleUser(props.data.userId);
    if (!postAuthor.data) {
      setAuthor("Oops! No Author Saved!");
    } else {
      setAuthor(`${postAuthor.data.firstName} ${postAuthor.data.lastName}`);
    }
  }, [props.data]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <h5>{props.data.title}</h5>
        </Card.Title>
        <Card.Text>
          Author:{author}
          <br />
          {truncate(props.data.contents, 100)} ...
          <br />
          Last Updated:
          {dateFormat(
            "MM-dd-yyyy",
            dateFormat.parse(dateFormat.ISO8601_FORMAT, props.data.updatedAt)
          )}
        </Card.Text>
        <BlogPost data={props.data} fetch={props.fetch}/>
      </Card.Body>
    </Card>
  );
}
