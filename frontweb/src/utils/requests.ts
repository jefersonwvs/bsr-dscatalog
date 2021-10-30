import qs from 'qs';
import axios, { AxiosRequestConfig } from 'axios';
import history from './history';
import jwtDecode from 'jwt-decode';

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

/*
 * Some properties from token that is necessary for frontweb.
 * */
type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN'; // "enum"
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

/*
 * This function returns a TokenData when access_token is valid
 * or undefined otherwise.
 **/
export const getTokenData = () => {
   try {
      return jwtDecode(getAuthData().access_token) as TokenData;
   } catch (error) {
      return undefined;
   }
};

export const isAuthenticated = (): boolean => {
   const tokenData = getTokenData();
   return tokenData && tokenData.exp * 1000 > Date.now() ? true : false;
};


/*
 * Função que verifica se o usuário logado (tokenData)
 * possui algum dos papéis necessários para acessar algum recurso.
 * Parâmetros:
 *    - roles: Role[] --> lista de papéis autorizados para dado recurso. 
 * */


/**
 * Returns true if the logedd-in user has any role from a list of roles
 * needed to access a resource.
 * @param roles - List of roles
 * @returns true or false
 */
export const hasAnyRoles = (roles: Role[]): boolean => {
   if (roles.length === 0) { // O recurso é acessível sem considerar papéis
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
