import axios from "axios";


export default axios.create({
    // baseURL: process.env.REACT_STOCK_API_BASE_URL,
    baseURL: "http://localhost:8080"
});