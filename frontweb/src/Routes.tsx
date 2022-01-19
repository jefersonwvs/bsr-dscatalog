import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Navbar from 'components/Navbar';
import Home from 'pages/Home';
import Catalog from 'pages/Catalog';
import Admin from 'pages/Admin';
import ProductDetails from 'pages/ProductDetails';
import Auth from 'pages/Admin/Auth';

// prettier-ignore
const Routes = function () {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        
        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/products" exact>
          <Catalog />
        </Route>
        
        <Route path="/products/:productId">
          <ProductDetails />
        </Route>
        
        {/* Com o `<Redirect />`, o componente `<Auth />` é renderizado junto com o
          * componente `<Login />` que é uma de suas sub-rotas. */}
        <Redirect from="/admin/auth" to="/admin/auth/login" exact />
        <Route path="/admin/auth">
          <Auth />
        </Route>
        
        <Redirect from="/admin" to="/admin/products" exact />
        <Route path="/admin">
          <Admin />
        </Route>
      
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
