import jwtDecode from 'jwt-decode';
import { getAuthData } from './storage';

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
