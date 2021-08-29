export default {
  setDough({ getters, commit }, doughName) {
    const dough = getters.doughs.find((item) => item.name === doughName);
    commit("setDough", dough);
    commit("setPrice");
  },
  setSauce({ commit }, sauce) {
    commit("setSauce", sauce);
    commit("setPrice");
  },
  setSize({ commit }, size) {
    commit("setSize", size);
    commit("setPrice");
  },
  addIngredient({ commit }, ingredient) {
    commit("addIngredient", ingredient);
    commit("setIngredientsPrice");
    commit("setPrice");
  },
  removeIngredient({ commit }, ingredient) {
    commit("removeIngredient", ingredient);
    commit("setIngredientsPrice");
    commit("setPrice");
  },
  setPrice({ commit }) {
    commit("setPrice");
  },
};
