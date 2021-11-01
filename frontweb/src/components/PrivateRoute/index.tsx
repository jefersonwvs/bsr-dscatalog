import { Redirect, Route } from 'react-router-dom';
import { hasAnyRoles, isAuthenticated, Role } from 'utils/auth';

type Props = {
   path: string;
   children: React.ReactNode;
   roles?: Role[];
};

const PrivateRoute = (props: Props) => {
   const { path, children, roles = [] } = props;

   return (
      <Route
         path={path}
         render={({ location }) =>
            !isAuthenticated() ? (
               <Redirect
                  to={{
                     pathname: '/admin/auth/login',
                     state: { from: location },
                  }}
               />
            ) : !hasAnyRoles(roles) ? (
               <Redirect to="/admin/products" />
            ) : (
               children
            )
         }
      />
   );
};

export default PrivateRoute;
