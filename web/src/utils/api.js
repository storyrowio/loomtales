import axios from "axios";
import AppStorage from "utils/storage";

const Instance = axios.create({
    baseURL: process.env.API_URL
});

Instance.interceptors.request.use(
    async (config) => {
        const token = await AppStorage.GetItem('x-token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)


const Api = {
    Instance
}

export default Api;
