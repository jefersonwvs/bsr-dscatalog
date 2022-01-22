import jwtDecode from 'jwt-decode';

import { getAuthData } from './storage';

/**
 * `Role` - tipo de responsabilidade desempenhada
 * por um `user` do sistema.
 */
export type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN';

/**
 * `TokenData` dados extraídos da decodificação do
 * token gerado na autenticação.
 */
export type TokenData = {
  exp: number;
  user_name: string;
  authorities: Role[];
};

/**
 * Função que decodifica o token e o retorna estruturado de acordo
 * com o tipo `TokenData` ou retorna `undefined` quando não existe
 * token armazenado no `localStorage`.
 */
export const getTokenData = function (): TokenData | undefined {
  try {
    return jwtDecode(getAuthData().access_token) as TokenData;
  } catch (error) {
    return undefined;
  }
};

/**
 * Função que verifica se um `user` está autenticado e se sua
 * sessão de acesso não está expirada.
 */
export const isAuthenticated = function (): boolean {
  const tokenData = getTokenData();
  return tokenData && tokenData.exp * 1000 > Date.now() ? true : false;
};

/**
 * Função que verifica se o usuário logado possui algum dos
 * `roles` necessários para acessar um recurso.
 */
export const hasAnyRoles = function (roles: Role[]): boolean {
  if (roles.length === 0) return true;
  const tokenData = getTokenData();
  if (tokenData !== undefined) {
    return roles.some((role) => tokenData.authorities.includes(role));
  }
  return false;
};
