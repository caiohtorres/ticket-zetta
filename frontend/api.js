import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5555/api",
});

export default Api;
