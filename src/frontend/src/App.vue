<template>
  <div id="app">
    <AppLayout
      :doughs="doughs"
      :sizes="sizes"
      :sauces="sauces"
      :ingredients="ingredients"
    ></AppLayout>
  </div>
</template>

<script>
import AppLayout from "./layouts/AppLayout";
import pizza from "./static/pizza.json";
import {
  normalizeDough,
  normalizeIngredient,
  normalizeSize,
} from "./common/utils/helpers";

export default {
  name: "App",
  data() {
    return {
      doughs: pizza.dough.map((item) => normalizeDough(item)),
      sizes: pizza.sizes.map((item) => normalizeSize(item)),
      sauces: pizza.sauces,
      ingredients: pizza.ingredients.map((item) => normalizeIngredient(item)),
    };
  },
  components: {
    AppLayout,
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app-min";
</style>
