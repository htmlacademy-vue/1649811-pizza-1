import { Entity } from "./const";
import { calculatePrice } from "../../../common/utils/pizza";

export default {
  doughs: (state) => state.doughs,
  ingredients: (state) => state[Entity.INGREDIENTS],
  sauces: (state) => state.sauces,
  sizes: (state) => state.sizes,
  addedIngredients: (state) =>
    state[Entity.INGREDIENTS].filter((item) => item.count > 0) || [],
  ingredientsPrice: (state, getters) =>
    getters.addedIngredients.reduce(
      (acc, item) => acc + item.count * item.price,
      0
    ),

  pizza: (state, getters) => ({
    name: state[Entity.PIZZA_NAME],
    dough: state[Entity.CURRENT_DOUGH],
    ingredients: getters.addedIngredients,
    sauce: state[Entity.CURRENT_SAUCE],
    size: state[Entity.CURRENT_SIZE],
    price: calculatePrice(
      state[Entity.CURRENT_DOUGH].price,
      state[Entity.CURRENT_SAUCE].price,
      state[Entity.CURRENT_SIZE].multiplier,
      getters.ingredientsPrice
    ),
  }),
};
