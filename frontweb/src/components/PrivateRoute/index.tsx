import { Redirect, Route } from 'react-router-dom';

import { Role } from 'types/role';
import { hasAnyRoles, isAuthenticated } from 'utils/auth';

type Props = {
  children: React.ReactNode;
  path: string;
  roles?: Role[];
};

const PrivateRoute = function (props: Props) {
  const { path, children, roles = [] } = props;

  return (
    <Route
      path={path}
      render={({ location }) =>
        !isAuthenticated() ? (
          // Usuários não autenticados, ao tentarem acessar rotas protegidas,
          // serão redirecionados para área de login.
          <Redirect
            to={{
              pathname: '/admin/auth/login',
              state: { from: location },
            }}
          />
        ) : !hasAnyRoles(roles) ? (
          // Usuários logados, quando não possuem as responsabilidades
          // especificadas, são redirecionados para área administrativa comum.
          <Redirect to="/admin/products" />
        ) : (
          // Usuários autenticados e autorizados acessam o recurso
          children
        )
      }
    />
  );
};

export default PrivateRoute;
