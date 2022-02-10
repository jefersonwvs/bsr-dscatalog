import { Role } from 'types/role';
import { getTokenData } from './token';

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
