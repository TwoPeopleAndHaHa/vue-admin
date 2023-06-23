import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

import { ResponseData } from "./interface";
import { checkStatus } from "@/api/checkStatus";

import router from "@/routers";

// 配置 config 对象
const config = {
  baseURL: import.meta.env.VITE_APP_API_BASE_URL as string // 接口基准路径
};

// 封装 axios 请求类
class Request {
  // 创建 axios 实例
  service: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    // 实例化 axios
    this.service = axios.create(config);

    // * 请求拦截器
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // * 响应拦截器
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response;
        return data;
      },
      (error: AxiosError) => {
        // 超时 || 网络错误无 response
        const { response } = error;
        // 根据状态码提示
        if (response) checkStatus(response.status);
        // 无网络
        if (!window.navigator.onLine) router.replace("/500");
        return Promise.reject(error);
      }
    );
  }

  // 配置常用请求方式
  get<T>(url: string, params?: object, _object = {}): Promise<ResponseData<T>> {
    return this.service.get(url, { params, ..._object });
  }
  post<T>(url: string, params?: object, _object = {}): Promise<ResponseData<T>> {
    return this.service.post(url, params, _object);
  }
  // delete put download ...
}

export default new Request(config);
