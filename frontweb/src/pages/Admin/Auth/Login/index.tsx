import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import ButtonIcon from 'components/ButtonIcon';
import { requestBackendLogin } from 'utils/requests';

import './styles.css';

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const [hasError, setHasError] = useState<boolean>(false);

  const { register, handleSubmit } = useForm();

  const onSubmit = function (formData: FormData) {
    requestBackendLogin(formData)
      .then((response) => {
        setHasError(false);
        console.log(response.data);
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
            {...register('username')}
            type="text"
            className="form-control base-input"
            placeholder="E-mail"
            name="username"
          />
        </div>
        <div className="mb-2">
          <input
            {...register('password')}
            type="password"
            className="form-control base-input "
            placeholder="Senha"
            name="password"
          />
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
