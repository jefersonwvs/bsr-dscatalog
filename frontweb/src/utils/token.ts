import jwtDecode from 'jwt-decode';

import { Role } from 'types/role';
import { getAuthData } from './storage';

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
