import { dough, ingredients, sauces, sizes } from "../../../static/pizza.json";
import { normalizeDough, normalizeSize } from "../../../common/utils/helpers";
import { Entity } from "./const";

export default {
  loadedIngredients: ingredients,
  sauces,
  doughs: dough.map((item) => normalizeDough(item)),
  sizes: sizes.map((item) => normalizeSize(item)),
  [Entity.INGREDIENTS]: [],
  [Entity.CURRENT_DOUGH]: {},
  [Entity.CURRENT_SAUCE]: {},
  [Entity.CURRENT_SIZE]: {},
  [Entity.PIZZA_NAME]: "",
  [Entity.PIZZA_ID]: null,
  [Entity.PIZZA_COUNT]: 1,
};
