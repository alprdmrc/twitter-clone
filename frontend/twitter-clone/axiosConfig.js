import axios from "axios";

const api = axios.create({
  // .. congigure axios baseURL
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:9000",
});

export default api;
