import qs from 'qs';
import axios, { AxiosRequestConfig } from 'axios';
import history from './history';
import { getAuthData } from './storage';

/**
 * URL of the backend application.
 */
export const BASE_URL =
   process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

/**
 * Id for the client application to access the server application.
 */
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog';

/**
 * Password for the client application to access the server application.
 */
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'dscatalog123';

/**
 * Type to store data needed for login.
 */
type LoginData = {
   username: string;
   password: string;
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
   (response) => {
      return response;
   },
   (error) => {
      if (error.response.status === 401) {
         history.push('/admin/auth');
      }
      return Promise.reject(error);
   }
);
