export const calculatePrice = (
  doughPrice,
  saucePrice,
  multiplier,
  ingredients
) => {
  const ingredientsSum = ingredients.reduce(
    (acc, item) => acc + item.count * item.price,
    0
  );

  return (ingredientsSum + doughPrice + saucePrice) * multiplier;
};
