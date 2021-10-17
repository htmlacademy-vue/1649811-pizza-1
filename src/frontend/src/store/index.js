import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";
import {
  SET_ENTITY,
  ADD_ENTITY,
  DELETE_ENTITY,
  UPDATE_ENTITY,
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
} from "./mutation-types";
import VuexPlugins from "../plugins/vuex-plugins";
import { uniqueId } from "lodash";
import { MESSAGE_LIVE_TIME } from "../common/const/common";

Vue.use(Vuex);

const state = () => ({
  notifications: [],
});

const actions = {
  async init({ dispatch }) {
    await dispatch("cart/loadData");
    await dispatch("builder/loadData");
    await dispatch("builder/init");
    await dispatch("cart/init");
  },

  async createNotification({ commit }, { ...notification }) {
    const uniqueNotification = {
      ...notification,
      id: uniqueId(),
    };
    commit(ADD_NOTIFICATION, uniqueNotification);
    setTimeout(
      () => commit(DELETE_NOTIFICATION, uniqueNotification.id),
      MESSAGE_LIVE_TIME
    );
  },
};

const mutations = {
  [ADD_NOTIFICATION](state, notification) {
    state.notifications = [...state.notifications, notification];
  },
  [DELETE_NOTIFICATION](state, id) {
    state.notifications = state.notifications.filter(
      (notification) => notification.id !== id
    );
  },
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
  mutations,
  actions,
  modules,
  plugins: [VuexPlugins],
});
