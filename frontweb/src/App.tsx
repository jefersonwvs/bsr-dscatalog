import './assets/styles/custom.scss'; // Custom styles for Bootstrap
import './App.css'; // Global styles
import Routes from 'Routes';
import { useState } from 'react';
import { AuthContext, AuthContextData } from 'AuthContext';

const App = () => {
   
   const [authContextData, setAuthContextData] = useState<AuthContextData>({
      authenticated: false,
   });

   return (
      <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
         <Routes />
      </AuthContext.Provider>
   );
};

export default App;
