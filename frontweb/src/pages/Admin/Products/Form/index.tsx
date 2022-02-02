import { AxiosRequestConfig } from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { Product } from 'types/product';
import { requestBackend } from 'utils/requests';

import './styles.css';

const Form = function () {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();

  const history = useHistory();

  const onSubmit = function (formData: Product) {
    const data: Product = {
      ...formData,
      categories: [{ id: 2, name: '' }],
      imgUrl:
        'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/5-big.jpg',
    };

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/products',
      data,
      withCredentials: true,
    };

    requestBackend(config)
      .then((response) => {
        history.push('/admin/products');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCancel = function () {
    history.push('/admin/products');
  };

  return (
    <div className="product-crud-container">
      <div className="base-card product-crud-form-card">
        <h1 className="product-crud-form-title">DADOS DO PRODUTO</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row product-crud-inputs-container">
            <div className="col-lg-6 product-crud-inputs-left-container">
              <div className="margin-bottom-30">
                <input
                  {...register('name', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                  placeholder="Nome do produto"
                  name="name"
                />
                <div className="d-block invalid-feedback">
                  {errors.name?.message}
                </div>
              </div>

              <div className="margin-bottom-30">
                <input
                  {...register('price', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                  placeholder="Preço"
                  name="price"
                />
                <div className="d-block invalid-feedback">
                  {errors.price?.message}
                </div>
              </div>
              <div className="">
                <input type="text" className="form-control base-input" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="">
                <textarea
                  {...register('description', {
                    required: 'Campo obrigatório',
                  })}
                  className={`form-control h-auto base-input ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                  placeholder="Descrição"
                  name="description"
                  rows={10}
                />
                <div className="d-block invalid-feedback">
                  {errors.description?.message}
                </div>
              </div>
            </div>
          </div>
          <div className="product-crud-form-buttons-container">
            <button
              className="btn btn-outline-danger product-crud-form-button"
              onClick={handleCancel}
            >
              CANCELAR
            </button>
            <button className="btn btn-primary text-white product-crud-form-button">
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
