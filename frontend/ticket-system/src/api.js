import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5555",
});

export default Api;
