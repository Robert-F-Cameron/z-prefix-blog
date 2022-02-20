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
  return axios.get(API_URL + "user/" + user.id);
};
//Post Blog
const postBlog = (title, contents, published, userId) => {
  return axios
    .post(
      API_URL,
      {
        title,
        contents,
        published,
        userId,
      },
      { headers: authHeader() }
    )
    .then(response => {
      console.log(response.data);
      return response.data;
    });
};
//Post Blog
const updateBlogPost = (id, title, contents, published, userId) => {
  return axios
    .put(
      API_URL+id,
      {
        title,
        contents,
        published,
        userId,
      },
      { headers: authHeader() }
    )
    .then(response => {
      console.log(response.data);
      return response.data;
    });
};

export default {
  getPublicContent,
  getUserContent,
  postBlog,
  updateBlogPost
}