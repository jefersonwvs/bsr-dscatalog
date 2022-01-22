import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import jwtDecode from 'jwt-decode';

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

export type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  userFirstName: string;
  userId: number;
};

export const saveAuthData = function (loginResponse: LoginResponse) {
  localStorage.setItem(tokenKey, JSON.stringify(loginResponse));
};

export const getAuthData = function () {
  return JSON.parse(localStorage.getItem(tokenKey) ?? '{}') as LoginResponse;
};

export const removeAuthData = function () {
  localStorage.removeItem(tokenKey);
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
    if (error.response?.status === 401 || error.response?.status === 403) {
      history.push('/admin/auth/login');
    }
    return Promise.reject(error);
  }
);

type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN';

export type TokenData = {
  exp: number;
  user_name: string;
  authorities: Role[];
};

export const getTokenData = function (): TokenData | undefined {
  try {
    return jwtDecode(getAuthData().access_token) as TokenData;
  } catch (error) {
    return undefined;
  }
};

export const isAuthenticated = function (): boolean {
  const tokenData = getTokenData();
  return tokenData && tokenData.exp * 1000 > Date.now() ? true : false;
};

export const hasAnyRoles = function (roles: Role[]): boolean {
  if (roles.length === 0) return true;
  const tokenData = getTokenData();
  if (tokenData !== undefined) {
    return roles.some((role) => tokenData.authorities.includes(role));
  }
  return false;
};
