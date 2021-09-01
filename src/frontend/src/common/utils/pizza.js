export const calculatePrice = (
  doughPrice,
  saucePrice,
  multiplier,
  ingredientsPrice
) => {
  return (ingredientsPrice + doughPrice + saucePrice) * multiplier;
};
export const calculateIngredientsPrice = (ingredients) => {
  return ingredients.reduce((acc, item) => acc + item.count * item.price, 0);
};
export const getAddedIngredients = (ingredients) => {
  return ingredients.filter((item) => item.count > 0);
};
