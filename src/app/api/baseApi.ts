import axios from "axios";
import { getToken } from "../token/Token";

export const baseApi = axios.create({
<<<<<<< HEAD
  // baseURL: "http://localhost:8088/api/v1",
  baseURL: "https://talewhirl-api-v1.onrender.com/api/v1",
=======
  baseURL: "http://localhost:8088/api/v1",
>>>>>>> aac2d59513dc7d438eef6c126e5a212b2a864562
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to inject JWT token
baseApi.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const request = ({
  method,
  url,
  data,
}: {
  method: string;
  url: string;
  data?: any;
}) =>
  baseApi({
    method,
    url,
    data,
  });
