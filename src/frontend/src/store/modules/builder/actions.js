import {
  INGREDIENT_MAX_COUNT,
  INGREDIENT_MIN_COUNT,
} from "../../../common/constants";
import {
  calculatePrice,
  calculateIngredientsPrice,
  getAddedIngredients,
  getIngredientIndex,
} from "../../../common/utils/pizza";

export default {
  async setDough({ getters, dispatch, commit }, doughName) {
    const dough = getters.doughs.find((item) => item.name === doughName);
    commit("setDough", dough);
    dispatch("setPrice");
  },
  setSauce({ getters, dispatch, commit }, sauceName) {
    const sauce = getters.sauces.find((item) => item.name === sauceName);
    commit("setSauce", sauce);
    dispatch("setPrice");
  },
  setSize({ getters, dispatch, commit }, sizeName) {
    const size = getters.sizes.find((item) => item.name === sizeName);
    commit("setSize", size);
    dispatch("setPrice");
  },
  setName({ commit }, name) {
    commit("setName", name);
  },
  async setPrice({ state, commit }) {
    const price = calculatePrice(
      state.currentDough.price,
      state.currentSauce.price,
      state.currentSize.multiplier,
      state.ingredientsPrice
    );
    commit("setPrice", price);
  },
  async setIngredient({ getters, dispatch, commit }, { ingredientId, count }) {
    if (count < INGREDIENT_MIN_COUNT || count > INGREDIENT_MAX_COUNT) {
      return;
    }

    const index = getIngredientIndex(getters.ingredients, ingredientId);
    if (~index) {
      commit("changeIngredient", { index, count });

      const addedIngredients = getAddedIngredients(getters.ingredients);
      commit("setIngredients", addedIngredients);

      const ingredientsPrice = calculateIngredientsPrice(addedIngredients);
      commit("setIngredientsPrice", ingredientsPrice);

      dispatch("setPrice");
    }
  },
};
