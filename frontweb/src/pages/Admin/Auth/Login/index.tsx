import { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import ButtonIcon from 'components/ButtonIcon';
import { AuthContext } from 'AuthContext';
import { requestBackendLogin } from 'utils/requests';
import { LoginResponse, saveAuthData } from 'utils/storage';
import { getTokenData } from 'utils/token';

import './styles.css';

type CredentialsDTO = {
  username: string;
  password: string;
};

type LocationState = {
  from: string;
};

const Login = () => {
  // Hook para gerenciar estado de erro
  const [hasError, setHasError] = useState<boolean>(false);

  // Hook para gerenciar acesso ao contexto global
  const { setAuthContextData } = useContext(AuthContext);

  // Hook para gerenciar histórico
  const history = useHistory();

  // Hook para gerenciar rotas
  const location = useLocation<LocationState>();

  // Hook para trabalhar com formulários
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialsDTO>();

  const { from } = location.state || { from: { pathname: '/admin' } };

  const onSubmit = function (formData: CredentialsDTO) {
    requestBackendLogin(formData)
      .then((response) => {
        saveAuthData(response.data as LoginResponse);
        setAuthContextData({ authenticated: true, tokenData: getTokenData() });
        setHasError(false);
        history.replace(from);
      })
      .catch((error) => {
        setHasError(true);
        console.error(error);
      });
  };

  return (
    <div className="base-card login-card">
      <h1>LOGIN</h1>
      {hasError && (
        <div className="mb-4 alert alert-danger">Credenciais inválidas</div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            {...register('username', {
              required: 'Campo obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'E-mail inválido',
              },
            })}
            type="text"
            className={`form-control base-input ${
              errors.username ? 'is-invalid' : ''
            }`}
            placeholder="E-mail"
            name="username"
          />
          <div className="d-block invalid-feedback">
            {errors.username?.message}
          </div>
        </div>
        <div className="mb-2">
          <input
            {...register('password', { required: 'Campo obrigatório' })}
            type="password"
            className={`form-control base-input ${
              errors.password ? 'is-invalid' : ''
            }`}
            placeholder="Senha"
            name="password"
          />
          <div className="d-block invalid-feedback">
            {errors.password?.message}
          </div>
        </div>
        <Link to="/admin/auth/recover" className="login-link-recover">
          Esqueci a senha
        </Link>
        <div className="login-submit">
          <ButtonIcon text="Fazer login" />
        </div>
        <div className="signup-container">
          <span className="not-registered">Não tem Cadastro?</span>
          <Link to="/admin/auth/register" className="login-link-register">
            CADASTRAR
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
