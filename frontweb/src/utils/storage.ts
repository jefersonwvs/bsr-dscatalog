const tokenKey = 'authData';

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
