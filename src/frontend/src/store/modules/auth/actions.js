import { Entity, MODULE } from "./const";
import { SET_ENTITY } from "../../mutation-types";
import resources from "../../../common/enums/resources";

const module = MODULE;

export default {
  async setAuth({ dispatch, commit }) {
    if (this.$jwt.getToken()) {
      this.$api.auth.setAuthHeader();
      const value = await dispatch("getMe");
      commit(
        SET_ENTITY,
        { module, entity: Entity.IS_AUTHENTICATED, value },
        { root: true }
      );

      return true;
    }

    return false;
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
      { module, entity: Entity.ADDRESSES, value: [] },
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

  async setUserAddresses({ commit }) {
    try {
      const value = await this.$api[resources.ADDRESSES].get();
      commit(
        SET_ENTITY,
        { module, entity: Entity.ADDRESSES, value },
        { root: true }
      );
    } catch (e) {
      console.log(e);
    }
  },
};
