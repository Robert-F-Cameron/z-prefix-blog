import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import AuthService from '../services/auth.service';

const Profile = () => {
    const currentUser = AuthService.getCurrentUser();
    return (
      <Container>
        <header>{currentUser.usernanme} Profile</header>
        <ListGroup horizontal>
          <ListGroup.Item>Token:</ListGroup.Item>
          <ListGroup.Item>
            {currentUser.accessToken.substring(0, 20)} ...{" "}
            {currentUser.accessToken.substr(
              currentUser.accessToken.length - 20
            )}
          </ListGroup.Item>
        </ListGroup>
        <ListGroup horizontal>
          <ListGroup.Item>First Name:</ListGroup.Item>
          <ListGroup.Item>{currentUser.firstName}</ListGroup.Item>
        </ListGroup>
        <ListGroup horizontal>
          <ListGroup.Item>Last Name:</ListGroup.Item>
          <ListGroup.Item>{currentUser.lastName}</ListGroup.Item>
        </ListGroup>
        <ListGroup horizontal>
          <ListGroup.Item>Email:</ListGroup.Item>
          <ListGroup.Item>{currentUser.email}</ListGroup.Item>
        </ListGroup>
      </Container>
    );
};

export default Profile;