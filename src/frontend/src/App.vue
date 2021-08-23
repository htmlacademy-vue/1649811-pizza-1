<template>
  <div id="app">
    <AppLayout>
      <router-view
        :doughs="routeProps.doughs"
        :sizes="routeProps.sizes"
        :sauces="routeProps.sauces"
        :ingredients="routeProps.ingredients"
      />
    </AppLayout>
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
  methods: {
    getRouteProps() {
      return {
        doughs: this.doughs,
        sizes: this.sizes,
        sauces: this.sauces,
        ingredients: this.ingredients,
      };
    },
  },
  computed: {
    routeProps() {
      const routes = {
        IndexHome: this.getRouteProps(),
        LoginIndex: this.getRouteProps(),
      };
      return routes[this.$route.name] || {};
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app-min";
</style>
