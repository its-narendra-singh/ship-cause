import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000, // optional
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;