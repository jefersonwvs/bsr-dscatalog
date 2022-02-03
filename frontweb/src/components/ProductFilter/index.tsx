import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { AxiosRequestConfig } from 'axios';

import { ReactComponent as SearchIcon } from 'assets/images/search-icon.svg';
import { Category } from 'types/category';
import { requestBackend } from 'utils/requests';

import './styles.css';

type ProductFilterData = {
  name: string;
  category: Category;
};

const ProductFilter = function () //
{
  const { register, handleSubmit, control } = useForm<ProductFilterData>();

  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/categories',
    };

    requestBackend(config).then((response) => {
      setCategories(response.data.content as Category[]);
    });
  }, []);

  const onSubmit = function (formData: ProductFilterData) {
    console.log('Enviou: ', formData);
  };

  return (
    <div className="base-card product-filter-container">
      <form className="product-filter-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="product-filter-top-container">
          <input
            {...register('name')}
            className="form-control product-filter-name"
            type="text"
            name="name"
            placeholder="Nome do produto"
          />
          <button className="product-filter-search-button">
            <SearchIcon />
          </button>
        </div>
        <div className="product-filter-bottom-container">
          <div className="product-filter-category-container">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  classNamePrefix="product-filter-category"
                  options={categories}
                  placeholder="Categoria"
                  getOptionLabel={(category: Category) => category.name}
                  getOptionValue={(category: Category) => category.id + ''}
                  isClearable
                />
              )}
            />
          </div>
          <button className="btn btn-outline-secondary product-filter-btn-clear">
            LIMPAR<span className="product-filter-btn-word"> FILTRO</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductFilter;
