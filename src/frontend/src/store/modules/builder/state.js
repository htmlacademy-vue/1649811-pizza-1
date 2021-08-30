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
  addedIngredients: [],
  currentDough: dough[0],
  currentSauce: sauces[0],
  currentSize: sizes[0],
  pizzaName: "",
  price: 0,
};
