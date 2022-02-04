import Routes from 'Routes';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { AuthContext, AuthContextData } from 'AuthContext';

import './assets/styles/custom.scss'; // bootstrap theme
import 'react-toastify/dist/ReactToastify.css';
import './App.css'; // global styles

function App() {
  /**
   * Criação de um estado local para armazenar dados de autenticação
   */
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  });

  return (
    /**
     * Associando o estado local e sua respectiva função atualizadora ao
     * contexto global.
     */
    <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
      <Routes />
      <ToastContainer />
    </AuthContext.Provider>
  );
}

export default App;
