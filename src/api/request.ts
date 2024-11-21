import axios from "axios";
import { serverConfig } from "./config";

// Create axios instance
const request = axios.create({
  baseURL: serverConfig.baseURL, // Base request URL
  timeout: 100000, // Request timeout
  withCredentials: false, // Whether to include cookies in cross-domain requests
});

// Request interceptor
request.interceptors.request.use(
  (config) => {
    if (!config.headers["content-type"]) {
      config.headers["content-type"] = "application/json"; // Default type
    }
    const token = localStorage.getItem("token");
    if (token && !config.headers["Authorization"]) {
      config.headers["Authorization"] = token;
    }
    console.log("Request configuration", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
request.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    console.log(error?.response, "error");
    return Promise.reject(error?.message);
  }
);

export default request;
