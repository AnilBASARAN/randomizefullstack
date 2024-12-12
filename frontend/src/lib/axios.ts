import axios, { AxiosInstance } from "axios";

// Access the VITE_API_URL variable from the .env file
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
});
