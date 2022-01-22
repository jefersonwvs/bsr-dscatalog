/**
 * Chave dos dados de autenticação armazenados
 * no `localStorage`.
 */
const tokenKey = 'authData';

/**
 * Tipo do corpo da resposta de uma requisição de login
 * efetuada com sucesso.
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
 * Função que salva a resposta à requisição de login no `localStorage`.
 */
export const saveAuthData = function (loginResponse: LoginResponse) {
  localStorage.setItem(tokenKey, JSON.stringify(loginResponse));
};

/**
 * Função que lê, do `localStorage`, os dados de login de um usuário.
 */
export const getAuthData = function () {
  return JSON.parse(localStorage.getItem(tokenKey) ?? '{}') as LoginResponse;
};

/**
 * Função que exclui, do `localStorage`, os dados de login.
 */
export const removeAuthData = function () {
  localStorage.removeItem(tokenKey);
};
