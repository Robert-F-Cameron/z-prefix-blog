import axios from 'axios';
import authHeader from './auth-header';
import authService from './auth.service'
const API_URL = "http://localhost:8080/api/blogPosts/";

const user = authService.getCurrentUser();
//Gets all public content
const getPublicContent = () => {
    return axios.get(API_URL);
};
//Gets User Content
const getUserContent = () => {
    return axios.get(API_URL +"user/"+ user.id);
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