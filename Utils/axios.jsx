import axios from "axios";


const instance = axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_URL}`,
    headers:{
        "Content-type": "application/json; charset=UTF-8"
    }
})

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("Token");

        if (token) {
            config.headers["Token"] = token;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default instance;

