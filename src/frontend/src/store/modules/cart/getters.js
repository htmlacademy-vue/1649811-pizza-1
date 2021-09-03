import { calculateItemsPrice } from "../../../common/utils/pizza";
import { Entity } from "./const";

export default {
  price: (state, getters) => {
    return getters.itemsPrice
      ? getters.itemsPrice + getters.additionalPrice
      : 0;
  },
  itemsPrice: (state) => {
    return calculateItemsPrice(state[Entity.ITEMS]);
  },
  additionalPrice: (state) => {
    return calculateItemsPrice(state[Entity.ADDITIONAL]);
  },
  getItems: (state) => {
    return state[Entity.ITEMS];
  },
  getAdditional: (state) => {
    return state[Entity.ADDITIONAL];
  },
};
