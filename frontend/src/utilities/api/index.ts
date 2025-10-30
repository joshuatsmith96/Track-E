import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const useApi = () => {
  const { getToken } = useAuth();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const request = async (options: any) => {
    const token = await getToken();
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };

    return api({ ...options, headers });
  };

  return { request };
};

export default api;
