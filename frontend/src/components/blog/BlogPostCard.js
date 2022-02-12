import React, { useEffect, useState, useCallback } from "react";
import { Card } from "react-bootstrap";
import userService from "../../services/user.service";
const dateFormat = require('date-format')

function truncate(str, numWords) {
    return str.split(" ").splice(0,numWords).join(" ");
}


export function BlogPostCard(props) {
    const [author, setAuthor] = useState('');
    const fetchData = useCallback(async () => {
        var author_ = await userService.getSingleUser(props.data.userId);
        var author = author_.data
        setAuthor(`${author.firstName} ${author.lastName}`)
    }, [props.data.userId]);
    
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
        {/* <BlogPost data={props.data}/> */}
      </Card.Body>
    </Card>
  );
}
