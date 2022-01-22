import { Link, NavLink } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import { getTokenData, isAuthenticated, removeAuthData } from 'utils/requests';
import history from 'utils/history';
import { AuthContext } from 'AuthContext';

import 'bootstrap/js/src/collapse.js';
import './styles.css';

const Navbar = function () {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({ authenticated: true, tokenData: getTokenData() });
    } else {
      setAuthContextData({ authenticated: false });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = function (
    event: React.MouseEvent<HTMLAnchorElement>
  ) {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({ authenticated: false });
    history.replace('/');
  };

  return (
    <nav className="navbar navbar-dark navbar-expand-md bg-primary main-nav">
      <div className="container-fluid">
        <Link to="/" className="nav-logo-text">
          <h4>DS Catalog</h4>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#dscatalog-navbar"
          aria-controls="dscatalog-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="dscatalog-navbar">
          <ul className="navbar-nav offset-md-3 main-menu">
            <li>
              <NavLink to="/" exact activeClassName="active">
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" activeClassName="active">
                CATÁLOGO
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin" activeClassName="active">
                ADMIN
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="nav-login-logout">
          {authContextData.authenticated ? (
            <>
              <span className="nav-username">
                {authContextData.tokenData?.user_name}
              </span>
              <a href="#logout" onClick={handleLogoutClick}>
                LOGOUT
              </a>
            </>
          ) : (
            <Link to="/admin/auth/login">LOGIN</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
