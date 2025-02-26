import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:4000/api", // Backend URL
});

export default API;
