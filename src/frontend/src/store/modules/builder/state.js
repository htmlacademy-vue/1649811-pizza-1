import { dough, ingredients, sauces, sizes } from "../../../static/pizza.json";
import {
  normalizeDough,
  normalizeIngredient,
  normalizeSize,
} from "../../../common/utils/helpers";

export default {
  doughs: dough.map((item) => normalizeDough(item)),
  ingredients: ingredients.map((item) => normalizeIngredient(item)),
  sauces,
  sizes: sizes.map((item) => normalizeSize(item)),
  ingredientsPrice: 0,
  pizza: {
    dough: dough[0],
    ingredients: [],
    sauce: sauces[0],
    size: sizes[0],
    price: 0,
  },
};
