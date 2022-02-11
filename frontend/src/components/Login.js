import React, { useState } from 'react';
import AuthService from '../services/auth.service';
import { Button, Form} from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from "yup";


const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  //Form event watchers
  const onChangeUsername = e => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangePassword = e => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = e => {
    setLoading(true);
    AuthService.login(username, password).then(
      () => {
        props.history.push("/profile");
        window.location.reload();
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        username: "",
        password: "",
      }}
    >
      {({
        handleLogin,
        onChangeUsername,
        onChangePassword,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleLogin}>
          <Form.Group controlId="validationFormik01">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={values.username}
              onChange={onChangeUsername}
              isValid={touched.username && !errors.username}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="validationFormik02">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              name="password"
              value={values.password}
              onChange={onChangePassword}
              isValid={touched.password && !errors.password}
            />
          </Form.Group>
          <Button type="submit">Submit form</Button>
        </Form>
      )};
    </Formik>
  );
};
export default Login;