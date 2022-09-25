import axios from "axios";

const BASE_URL = "https://ec9c-136-158-30-44.ngrok.io";

export const instance = axios.create({
  baseURL: BASE_URL,
});

export const privateInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  // headers: { "Content-Type": "application/json" },
});

instance.defaults.withCredentials = true;
