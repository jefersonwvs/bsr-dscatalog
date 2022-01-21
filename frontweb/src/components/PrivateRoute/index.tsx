import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from 'utils/requests';

type Props = {
  children: React.ReactNode;
  path: string;
};

const PrivateRoute = function (props: Props) {
  const { path, children } = props;

  return (
    <Route
      path={path}
      render={() =>
        isAuthenticated() ? children : <Redirect to="/admin/auth/login" />
      }
    />
  );
};

export default PrivateRoute;
