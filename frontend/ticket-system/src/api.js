import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5555", // ou a URL da sua API
});

export default Api;
