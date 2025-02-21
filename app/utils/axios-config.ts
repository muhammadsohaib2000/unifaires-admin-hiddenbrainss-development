import { getSession } from "next-auth/react";
import config from "./config";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: config.API.API_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.user?.token) {
    config.headers["x-token"] = session.user.token;
  }

  return config;
});

export default axiosInstance;
