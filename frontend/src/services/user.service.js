import axios from "axios";
import authHeader from "./auth-header";
const API_URL =
  `${process.env.DATABASE_URL}/api/users/` ||
  "http://localhost:8080/api/users/";


//Gets Single User
const getSingleUser = (userId) => {
  return axios.get(API_URL + userId);
};


export default {
    getSingleUser
};
