import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';

import history from './history';
import { getAuthData } from './storage';

export const BASE_URL =
  process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'dscatalog123';

type LoginData = {
  username: string;
  password: string;
};

export const requestBackendLogin = function (loginData: LoginData) {
  const headers = {
    Authorization: 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET),
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const data = qs.stringify({
    // urlencoded body
    ...loginData,
    grant_type: 'password',
  });

  const request: AxiosRequestConfig = {
    method: 'POST',
    baseURL: BASE_URL,
    url: '/oauth/token',
    headers,
    data,
  };

  return axios(request);
};

export const requestBackend = function (incompleteConfig: AxiosRequestConfig) {
  const headers = incompleteConfig.withCredentials
    ? {
        Authorization: `Bearer ${getAuthData().access_token}`,
        ...incompleteConfig.headers,
      }
    : incompleteConfig.headers;

  const config = { baseURL: BASE_URL, ...incompleteConfig, headers };

  return axios(config);
};

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      history.push('/admin/auth/login');
    }
    return Promise.reject(error);
  }
);
