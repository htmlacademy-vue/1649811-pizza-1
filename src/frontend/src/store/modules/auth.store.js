// import user from "../../static/user.json";
import { SET_ENTITY } from "../mutation-types";

const module = "auth";
const Entity = {
  IS_AUTHENTICATED: "isAuth",
  USER: "user",
};

export default {
  namespaced: true,
  state: {
    [Entity.IS_AUTHENTICATED]: false,
    [Entity.USER]: null,
  },

  getters: {
    getUserAttribute: (state) => (attr) =>
      state[Entity.USER] ? state[Entity.USER][attr] : "",
    getUser: (state) => {
      return state[Entity.USER];
    },
  },

  actions: {
    async setAuth({ dispatch, commit }) {
      if (this.$jwt.getToken()) {
        this.$api.auth.setAuthHeader();
        const value = await dispatch("getMe");
        commit(
          SET_ENTITY,
          { module, entity: Entity.IS_AUTHENTICATED, value },
          { root: true }
        );
      }
    },

    async login({ commit, dispatch }, credentials) {
      const data = await this.$api.auth.login(credentials);
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();
      commit(
        SET_ENTITY,
        { module, entity: Entity.IS_AUTHENTICATED, value: true },
        { root: true }
      );
      dispatch("getMe");
    },

    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();
      commit(
        SET_ENTITY,
        { module, entity: Entity.IS_AUTHENTICATED, value: false },
        { root: true }
      );
      commit(
        SET_ENTITY,
        { module, entity: Entity.USER, value: null },
        { root: true }
      );
    },

    async getMe({ commit, dispatch }) {
      try {
        const data = await this.$api.auth.getMe();
        commit(
          SET_ENTITY,
          { module, entity: Entity.USER, value: data },
          { root: true }
        );
        return true;
      } catch {
        dispatch("logout", false);
        return false;
      }
    },
  },
};
