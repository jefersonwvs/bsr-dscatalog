/**
 * Função que formata um `price` no formato da moeda
 * brasileira (R$).
 */
export const formatPrice = function (price: number) {
  const locales = ['pt-BR'];
  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return new Intl.NumberFormat(locales, options).format(price);
};
