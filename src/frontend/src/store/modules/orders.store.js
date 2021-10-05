import { SET_ENTITY } from "../mutation-types";

const module = "orders";
const Entity = {
  ADDRESS: "address",
};

export default {
  namespaced: true,
  state: {
    [Entity.ADDRESS]: null,
  },

  actions: {
    setAddress({ commit }, address) {
      commit(
        SET_ENTITY,
        { module, entity: Entity.ADDRESS, value: address },
        { root: true }
      );
    },

    async clearAddress({ commit }) {
      commit(
        SET_ENTITY,
        { module, entity: Entity.ADDRESS, value: null },
        { root: true }
      );
    },
  },
};
