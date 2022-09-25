import axios from "axios";

const isDevelopment = false;
const BASE_URL = isDevelopment
  ? "https://localhost:5000"
  : "https://galleria-server.herokuapp.com/";

export const instance = axios.create({
  baseURL: BASE_URL,
});

export const privateInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  // headers: { "Content-Type": "application/json" },
});

instance.defaults.withCredentials = true;
