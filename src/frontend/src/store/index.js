import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";
import {
  SET_ENTITY,
  ADD_ENTITY,
  DELETE_ENTITY,
  UPDATE_ENTITY,
} from "./mutation-types";

Vue.use(Vuex);

const state = () => ({});

const actions = {
  async init({ dispatch }) {
    dispatch("builder/init");
    dispatch("cart/init");
  },
};

const mutations = {
  [SET_ENTITY](state, { module, entity, value }) {
    module ? (state[module][entity] = value) : (state[entity] = value);
  },
  [ADD_ENTITY](state, { module, entity, value }) {
    if (module) {
      state[module][entity] = [...state[module][entity], value];
    } else {
      state[entity] = [...state[entity], value];
    }
  },
  [UPDATE_ENTITY](state, { module, entity, value, itemIndex = null }) {
    if (module) {
      if (itemIndex) {
        state[module][entity].splice(itemIndex, 1, value);
        return;
      }
      const index = state[module][entity].findIndex(
        ({ id }) => id === value.id
      );
      if (~index) {
        state[module][entity].splice(index, 1, value);
      }
    } else {
      if (itemIndex) {
        state[entity].splice(itemIndex, 1, value);
        return;
      }
      const index = state[entity].findIndex(({ id }) => id === value.id);
      if (~index) {
        state[entity].splice(index, 1, value);
      }
    }
  },
  [DELETE_ENTITY](state, { module, entity, id }) {
    if (module) {
      state[module][entity] = state[module][entity].filter(
        (e) => +e.id !== +id
      );
    } else {
      state[entity] = state[entity].filter((e) => +e.id !== +id);
    }
  },
};

export default new Vuex.Store({
  state,
  // getters: {},
  mutations,
  actions,
  modules,
});
