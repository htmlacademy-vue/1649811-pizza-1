import {
  INGREDIENT_MAX_COUNT,
  INGREDIENT_MIN_COUNT,
} from "../../../common/constants";
import { normalizeIngredient } from "../../../common/utils/helpers";
import { SET_ENTITY, UPDATE_ENTITY } from "../../mutation-types";
import { MODULE, Entity } from "./const";

const module = MODULE;

export default {
  async init({ state, dispatch }, pizza = null) {
    let id, name, dough, sauce, size, count;
    const ingredients = state.loadedIngredients.map((item) =>
      normalizeIngredient(item)
    );

    if (pizza) {
      ({ id, name, dough, sauce, size, count } = pizza);
      pizza.ingredients.forEach((item) => {
        const ingredient = ingredients.find((i) => +i.id === +item.id);
        if (ingredient) {
          ingredient.count = item.count;
        }
      });
    } else {
      id = null;
      name = "";
      dough = state.doughs[0];
      sauce = state.sauces[0];
      size = state.sizes[0];
      count = 1;
    }
    dispatch("setEntity", { entity: Entity.PIZZA_ID, value: id });
    dispatch("setEntity", { entity: Entity.INGREDIENTS, value: ingredients });
    dispatch("setName", name);
    dispatch("setEntity", { entity: Entity.CURRENT_DOUGH, value: dough });
    dispatch("setEntity", { entity: Entity.CURRENT_DOUGH, value: dough });
    dispatch("setEntity", { entity: Entity.CURRENT_SAUCE, value: sauce });
    dispatch("setEntity", { entity: Entity.CURRENT_SIZE, value: size });
    dispatch("setEntity", { entity: Entity.PIZZA_COUNT, value: count });
  },
  async setEntity({ commit }, data) {
    commit(SET_ENTITY, { module, ...data }, { root: true });
  },
  async setDough({ state, dispatch }, doughName) {
    const dough = state.doughs.find((item) => item.name === doughName);
    dispatch("setEntity", { entity: Entity.CURRENT_DOUGH, value: dough });
  },
  async setSauce({ state, dispatch }, sauceName) {
    const sauce = state.sauces.find((item) => item.name === sauceName);
    dispatch("setEntity", { entity: Entity.CURRENT_SAUCE, value: sauce });
  },
  async setSize({ state, dispatch }, sizeName) {
    const size = state.sizes.find((item) => item.name === sizeName);
    dispatch("setEntity", { entity: Entity.CURRENT_SIZE, value: size });
  },
  async setName({ dispatch }, name) {
    dispatch("setEntity", { entity: Entity.PIZZA_NAME, value: name });
  },

  async setIngredient({ state, commit }, { ingredientId, count }) {
    if (count < INGREDIENT_MIN_COUNT || count > INGREDIENT_MAX_COUNT) {
      return;
    }

    const ingredient = state[Entity.INGREDIENTS].find(
      ({ id }) => +id === +ingredientId
    );
    if (ingredient) {
      const value = { ...ingredient, count };
      commit(
        UPDATE_ENTITY,
        { module, entity: Entity.INGREDIENTS, value },
        { root: true }
      );
    }
  },
};
