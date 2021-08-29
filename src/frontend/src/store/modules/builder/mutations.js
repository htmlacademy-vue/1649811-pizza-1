export default {
  setDough({ pizza }, dough) {
    pizza.dough = dough;
  },
  setSauce({ pizza }, sauce) {
    pizza.sauce = sauce;
  },
  setSize({ pizza }, size) {
    pizza.size = size;
  },
  addIngredient({ pizza }, ingredient) {
    const addedIngredient = pizza.ingredients.find(
      (item) => item.id === ingredient.id
    );
    if (addedIngredient) {
      addedIngredient.count++;
    } else {
      pizza.ingredients = [...pizza.ingredients, ingredient];
    }
  },
  removeIngredient({ pizza }, ingredient) {
    const removedIngredient = pizza.ingredients.find(
      (item) => item.id === ingredient.id
    );
    if (removedIngredient && removedIngredient.count > 0) {
      removedIngredient.count--;
    }
  },
  setPrice(state) {
    const {
      pizza: { dough, sauce, size },
    } = state;

    state.pizza.price =
      (state.ingredientsPrice + dough.price + sauce.price) * size.multiplier;
  },
  setIngredientsPrice(state) {
    const {
      pizza: { ingredients },
    } = state;

    state.ingredientsPrice = ingredients.reduce(
      (acc, item) => acc + item.count * item.price,
      0
    );
  },
};
