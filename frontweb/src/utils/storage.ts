/**
 * Default `key` used to storage authentication data on `localStorage`.
 */
const tokenKey = 'authData';

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
