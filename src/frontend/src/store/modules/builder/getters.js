export default {
  doughs: (state) => state.doughs,
  ingredients: (state) => state.ingredients,
  sauces: (state) => state.sauces,
  sizes: (state) => state.sizes,

  pizza: (state) => ({
    name: state.pizzaName,
    dough: state.currentDough,
    ingredients: state.addedIngredients,
    sauce: state.currentSauce,
    size: state.currentSize,
    price: state.price,
  }),
};
