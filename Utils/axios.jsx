import axios from "axios";

const instance = axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_URL}`,
    headers:{
        "Content-type": "application/json; charset=UTF-8",
        "Token": localStorage.getItem("Token") || null,
    }
})

export default instance;

