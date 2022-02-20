import axios from 'axios';
const API_URL =
  `${process.env.DATABASE_URL}/api/users/` ||
  "http://localhost:8080/api/users/";

//Registration endpoint call
const register = (username, firstName, lastName, email, password, roles) => {
  return axios.post(API_URL + "signup", {
    username,
    firstName,
    lastName,
    email,
    password,
    roles
  });
};

//Login and saves the user info to browsers local storage
const login = (username, password) => {
    return axios
        .post(API_URL + 'signin', {
            username,
            password
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};
//logout to remove the user information from the browsers local storage
const logout = () => {
    localStorage.removeItem('user');
};
//Current user - Gets the current user from the localstorge
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
};