import qs from 'qs';
import axios, { AxiosRequestConfig } from 'axios';
import history from './history';

export const BASE_URL =
   process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'dscatalog123';

const tokenKey = 'authData';

type LoginData = {
   username: string;
   password: string;
};

export type LoginResponse = {
   access_token: string;
   token_type: string;
   expires_in: number;
   scope: string;
   userFirstName: string;
   userId: number;
};

export const requestBackendLogin = (loginData: LoginData) => {
   const headers = {
      Authorization: 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET),
      'Content-Type': 'application/x-www-form-urlencoded',
   };
   const data = qs.stringify({
      ...loginData,
      grant_type: 'password',
   });
   const config: AxiosRequestConfig = {
      method: 'POST',
      baseURL: BASE_URL,
      url: '/oauth/token',
      headers: headers,
      data: data,
   };
   return axios(config);
};

export const requestBackend = (config: AxiosRequestConfig) => {
   const headers = config.withCredentials
      ? {
           ...config.headers,
           Authorization: 'Bearer ' + getAuthData().access_token,
        }
      : config.headers;
   return axios({ baseURL: BASE_URL, ...config, headers });
};

export const saveAuthData = (loginResponse: LoginResponse) => {
   localStorage.setItem(tokenKey, JSON.stringify(loginResponse));
};

export const getAuthData = () => {
   const str = localStorage.getItem(tokenKey) ?? '{}';
   return JSON.parse(str) as LoginResponse;
};

// Add a request interceptor
axios.interceptors.request.use(
   function (config) {
      return config;
   },
   function (error) {
      return Promise.reject(error);
   }
);

// Add a response interceptor
axios.interceptors.response.use(
   function (response) {

      return response;
   },
   function (error) {
      if (error.response.status === 401 || error.response.status === 403) {
         history.push('/admin/auth');
      }

      return Promise.reject(error);
   }
);
