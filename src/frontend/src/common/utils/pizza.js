export const calculatePrice = (
  doughPrice,
  saucePrice,
  multiplier,
  ingredientsPrice
) => {
  return (ingredientsPrice + doughPrice + saucePrice) * multiplier;
};
export const calculateItemsPrice = (items) => {
  return items.reduce((acc, item) => acc + item.count * item.price, 0);
};
