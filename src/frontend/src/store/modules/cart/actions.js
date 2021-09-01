import { uniqueId } from "lodash";
import { ADD_ENTITY, DELETE_ENTITY, UPDATE_ENTITY } from "../../mutation-types";

const module = "cart";
const entity = "items";

const findItem = (state, id) => state.items.find((item) => +item.id === +id);

export default {
  addPizza({ commit, rootGetters }) {
    const pizza = rootGetters["builder/pizza"];
    const item = {
      id: uniqueId(),
      ...pizza,
      count: 1,
    };
    commit(ADD_ENTITY, { module, entity, value: item }, { root: true });
  },
  increment({ state, dispatch }, id) {
    const item = findItem(state, id);
    item.count++;
    dispatch("update", item);
  },
  decrement({ state, dispatch }, id) {
    const item = findItem(state, id);
    if (item.count === 1) {
      dispatch("delete", id);
      return;
    }
    item.count--;
    dispatch("update", item);
  },
  changeCount({ state, dispatch }, { id, count }) {
    const item = findItem(state, id);
    count = +count;
    if (count <= 0) {
      dispatch("delete", id);
      return;
    }
    item.count = count;
    dispatch("update", item);
  },
  changePizza({ state, dispatch }, id) {
    const pizza = state.items.find((item) => item.id === id);
    dispatch("builder/init", pizza, { root: true });
    dispatch("delete", id);
  },
  update({ commit }, item) {
    commit(UPDATE_ENTITY, { module, entity, value: item }, { root: true });
  },
  delete({ commit }, id) {
    commit(DELETE_ENTITY, { module, entity, id }, { root: true });
  },
};
