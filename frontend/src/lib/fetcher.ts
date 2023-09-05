import axiosbase, { AxiosRequestConfig } from "axios";

export const api = axiosbase.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  // @ts-ignore
  async (config: AxiosRequestConfig) => {
    const token = process.env.BEARER || "";
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  },
  (error) => Promise.reject(error)
);

export const fetcher = async (endPoint: string, options = {}) => {
  const result = await api.get(endPoint, options).then((res) => {
    if (!(res.status === 200)) throw new Error(res.statusText);
    return res.data;
  });
  return result;
};

export const api2 = axiosbase.create({
  baseURL: process.env.API_PLUGIN_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api2.interceptors.request.use(
  // @ts-ignore
  async (config: AxiosRequestConfig) => {
    const token = process.env.BEARER || "";
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  },
  (error) => Promise.reject(error)
);

export const fetcher2 = async (endPoint: string, options = {}) => {
  const result = await api.get(endPoint, options).then((res) => {
    if (!(res.status === 200)) throw new Error(res.statusText);
    return res.data;
  });
  return result;
};
