import React, { useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
//Import Components
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from './components/Home'
import UserContent from './components/UserContent'
import ModeratorContent from './components/ModeratorContent'
import AdminContent from './components/AdminContent'
import Profile from './components/Profile'

function App() {
  const [showUserContent, setShowUserContent] = useState(false);
  const [showModeratorContent, setShowModeratorContent] = useState(false);
  const [showAdminContent, setShowAdminContent] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowUserContent(user.roles.includes("ROLE_USER"));
      setShowModeratorContent(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminContent(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);
  const logOut = () => {
    AuthService.logout();
    window.location.href = "/";
  };
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to={"/home"}  >
            Supra Coder Blog
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/home"} className="nav-link">
                Home
              </Nav.Link>
              {showUserContent && (
                <Nav.Link as={Link} to={"/user"} className="nav-link">
                  Your Blog Posts
                </Nav.Link>
              )}
              ;
              {showModeratorContent && (
                <Nav.Link as={Link} to={"/mod"} className="nav-link">
                  Moderator Tools
                </Nav.Link>
              )}
              ;
              {showAdminContent && (
                <Nav.Link as={Link} to={"/admin"} className="nav-link">
                  Admin Tools
                </Nav.Link>
              )}
              ;
            </Nav>
            <Nav>
              {currentUser ? (
                <Nav>
                  <Nav.Link as={Link} to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Nav.Link>
                  <Nav.Link onClick={logOut} className="nav-link">
                    Logout
                  </Nav.Link>
                </Nav>
              ) : (
                <Nav>
                  <Nav.Link as={Link} to={"/login"} className="nav-link">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/register"} className="nav-link">
                    Register
                  </Nav.Link>
                </Nav>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/user" element={<UserContent />} />
          <Route exact path="/mod" element={<ModeratorContent />} />
          <Route exact path="/admin" element={<AdminContent />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
