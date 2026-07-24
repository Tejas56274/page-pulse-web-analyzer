import axios from "axios";

const API = axios.create({
  baseURL: "https://page-pulse-web-analyzer.onrender.com",
});

export default API;