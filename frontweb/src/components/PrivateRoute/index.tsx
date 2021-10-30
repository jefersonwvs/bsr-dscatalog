import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from 'utils/requests';

type Props = {
   path: string;
   children: React.ReactNode;
};

const PrivateRoute = (props: Props) => {
   const { path, children } = props;

   return (
      <Route
         path={path}
         render={({ location }) =>
            isAuthenticated() ? (
               children
            ) : (
               <Redirect
                  to={{
                     pathname: '/admin/auth/login',
                     state: { from: location },
                  }}
               />
            )
         }
      />
   );
};

export default PrivateRoute;
