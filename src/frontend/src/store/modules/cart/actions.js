import { uniqueId } from "lodash";
import {
  ADD_ENTITY,
  DELETE_ENTITY,
  SET_ENTITY,
  UPDATE_ENTITY,
} from "../../mutation-types";
import { normalizeAdditional } from "../../../common/utils/helpers";
import { MODULE, Entity } from "./const";
import { INGREDIENT_MIN_COUNT } from "../../../common/constants";

const module = MODULE;

const findItem = (state, entity, id) =>
  state[entity].find((item) => +item.id === +id);

export default {
  async init({ commit, state }) {
    const additional = state.loadedAdditional.map((product) =>
      normalizeAdditional(product)
    );
    commit(
      SET_ENTITY,
      { module, entity: Entity.ADDITIONAL, value: additional },
      { root: true }
    );
  },

  async addPizza({ commit, state, rootGetters }) {
    const pizza = rootGetters["builder/pizza"];
    const index = state.items.findIndex(({ id }) => id === pizza.id);
    if (~index) {
      commit(
        UPDATE_ENTITY,
        { module, entity: Entity.ITEMS, value: pizza, itemIndex: index },
        { root: true }
      );
      return;
    }

    const item = {
      ...pizza,
      id: uniqueId(),
    };
    commit(
      ADD_ENTITY,
      { module, entity: Entity.ITEMS, value: item },
      { root: true }
    );
  },

  async changePizza({ state, dispatch }, id) {
    const pizza = findItem(state, Entity.ITEMS, id);
    dispatch("builder/init", pizza, { root: true });
  },

  async incrementItems({ dispatch }, id) {
    dispatch("increment", { id, entity: Entity.ITEMS });
  },
  async decrementItems({ state, dispatch }, id) {
    const entity = Entity.ITEMS;
    const item = findItem(state, entity, id);
    if (item.count === 1) {
      dispatch("delete", { id, entity });
      return;
    }
    item.count--;
    dispatch("update", { item, entity });
  },
  async changeItemsCount({ state, dispatch }, { id, count }) {
    const entity = Entity.ITEMS;
    const item = findItem(state, entity, id);
    count = +count;
    if (count <= 0) {
      dispatch("delete", { id, entity });
      return;
    }
    item.count = count;
    dispatch("update", { item, entity });
  },

  async incrementAdditional({ dispatch }, id) {
    dispatch("increment", { id, entity: Entity.ADDITIONAL });
  },
  async decrementAdditional({ state, dispatch }, id) {
    const entity = Entity.ADDITIONAL;
    const item = findItem(state, entity, id);
    if (item.count <= INGREDIENT_MIN_COUNT) {
      return;
    }
    item.count--;
    dispatch("update", { item, entity });
  },
  async changeCountAdditional({ state, dispatch }, { id, count }) {
    const entity = Entity.ADDITIONAL;
    const item = findItem(state, entity, id);
    item.count = count <= INGREDIENT_MIN_COUNT ? INGREDIENT_MIN_COUNT : +count;
    dispatch("update", { item, entity });
  },

  async increment({ state, dispatch }, { id, entity }) {
    const item = findItem(state, entity, id);
    item.count++;
    dispatch("update", { item, entity });
  },
  async update({ commit }, { item, entity }) {
    commit(UPDATE_ENTITY, { module, entity, value: item }, { root: true });
  },
  async delete({ commit }, { id, entity }) {
    commit(DELETE_ENTITY, { module, entity, id }, { root: true });
  },
};
