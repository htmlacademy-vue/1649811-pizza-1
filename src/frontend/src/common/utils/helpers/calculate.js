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

export const calculatePizzaPrice = (pizza) => {
  const { dough, sauce, size, ingredients } = pizza;
  const ingredientsPrice = calculateItemsPrice(ingredients);
  return calculatePrice(
    dough.price,
    sauce.price,
    size.multiplier,
    ingredientsPrice
  );
};
