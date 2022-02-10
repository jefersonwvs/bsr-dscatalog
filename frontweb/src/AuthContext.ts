import { createContext } from 'react';

import { TokenData } from 'utils/token';

/**
 * Tipo de dados que armazena uma flag de autenticação
 * e os dados decodificados do token.
 */
export type AuthContextData = {
  authenticated: boolean;
  tokenData?: TokenData;
};

/**
 * Tipo de dados usado na criação de um contexto global.
 */
export type AuthContextType = {
  authContextData: AuthContextData;
  setAuthContextData: (authContextData: AuthContextData) => void;
};

/**
 * Criação do componente de contexto global.
 */
export const AuthContext = createContext<AuthContextType>({
  authContextData: {
    authenticated: false,
  },
  setAuthContextData: () => null,
});
