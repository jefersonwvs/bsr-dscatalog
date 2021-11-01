import qs from 'qs';
import axios, { AxiosRequestConfig } from 'axios';
import history from './history';
import jwtDecode from 'jwt-decode';

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
 * Default `key` used to storage authentication data on `localStorage`.
 */
const tokenKey = 'authData';

/**
 * Type to store data needed for login.
 */
type LoginData = {
   username: string;
   password: string;
};

/**
 * Type to store response data from login.
 */
export type LoginResponse = {
   access_token: string;
   token_type: string;
   expires_in: number;
   scope: string;
   userFirstName: string;
   userId: number;
};

/**
 * Type to store a role.
 */
export type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN';

/**
 * Type to store data from token.
 */
export type TokenData = {
   exp: number;
   user_name: string;
   authorities: Role[];
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

export const removeAuthData = () => {
   localStorage.removeItem(tokenKey);
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

/**
 * @returns a `TokenData` object when a user is logged-in or `undefined` otherwise.
 */
export const getTokenData = () => {
   try {
      return jwtDecode(getAuthData().access_token) as TokenData;
   } catch (error) {
      return undefined;
   }
};

/**
 * @returns `true` if user is authenticade or `false`, otherwise
 */
export const isAuthenticated = (): boolean => {
   const tokenData = getTokenData();
   return tokenData && tokenData.exp * 1000 > Date.now() ? true : false;
};

/**
 * Returns true if the logedd-in user has any role from a list of roles
 * needed to access a resource.
 * @param roles - List of roles
 * @returns true or false
 */
export const hasAnyRoles = (roles: Role[]): boolean => {
   if (roles.length === 0) {
      // O recurso é acessível sem considerar papéis
      return true;
   }
   const tokenData = getTokenData();
   if (tokenData !== undefined) {
      for (let i = 0; i < roles.length; i++) {
         if (tokenData.authorities.includes(roles[i])) {
            /* Se pelo menos um dos papéis do usuário logado estão
               incluídos na lista de papéis autorizados, retorna verdadeiro. */
            return true;
         }
      }
   }
   return false;
};
