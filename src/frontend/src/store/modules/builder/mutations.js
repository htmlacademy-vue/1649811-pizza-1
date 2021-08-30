export default {
  setDough(state, dough) {
    state.currentDough = dough;
  },
  setSauce(state, sauce) {
    state.currentSauce = sauce;
  },
  setSize(state, size) {
    state.currentSize = size;
  },
  changeIngredient({ ingredients }, { index, count }) {
    ingredients[index].count = count;
  },
  setIngredients(state, ingredients) {
    state.addedIngredients = ingredients;
  },
  setIngredientsPrice(state, price) {
    state.ingredientsPrice = price;
  },
  setPrice(state, price) {
    state.price = price;
  },
  setName(state, name) {
    state.pizzaName = name;
  },
};
