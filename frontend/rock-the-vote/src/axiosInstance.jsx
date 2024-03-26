// Create a customized Axios instance
import axios from "axios";

const instance = axios.create({});

// Add request interceptors - function that runs before the request is sent
instance.interceptors.request.use(
  (config) => {
    // runs on success
    // Add authentication token to headers if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptors
instance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle error responses
    return Promise.reject(error);
  }
);

export default instance;
