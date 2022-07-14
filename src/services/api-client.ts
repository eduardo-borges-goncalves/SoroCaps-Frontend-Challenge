import axios from "axios"
import Cookies from "js-cookie";
import { HOST_API } from "../config";

const axiosApiInstance = axios.create();

axiosApiInstance.defaults.baseURL = HOST_API

axiosApiInstance.interceptors.request.use(

  async (config: any) => {

    config.url = `${axiosApiInstance.defaults.baseURL}${config.url}`

    const authorization = Cookies.get('access_token');
    if (authorization) {
      config.headers['Authorization'] = `bearer ${authorization}`;
    }

    return config;
  },
  error => {
    Promise.reject(error)
  },
)

export default axiosApiInstance;