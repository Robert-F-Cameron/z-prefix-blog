import axios from 'axios';
import authHeader from './auth-header';
const API_URL = "http://localhost:8080/api/test/";

//Gets all public content
const getPublicContent = () => {
    return axios.get(API_URL + 'all');
};
//Gets User Content
const getUserContent = () => {
    return axios.get(API_URL + 'user', { headers: authHeader() });
}
//Gets Moderator Content
const getModContent = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};
//Gets Admin Content
const getAdminContent = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
    getPublicContent,
    getUserContent,
    getModContent,
    getAdminContent
}