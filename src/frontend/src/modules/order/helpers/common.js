export const getStringProductPrice = (product) => {
  return product.count === 1
    ? product.price
    : `${product.count}x${product.price}`;
};
