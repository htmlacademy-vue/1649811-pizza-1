<template>
  <div id="app">
    <AppLayout>
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "./layouts/AppLayout";

export default {
  name: "App",

  async mounted() {
    await Promise.all([
      this.$store.dispatch("init"),
      this.$store.dispatch("auth/setAuth"),
    ]);
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
#app {
  min-height: 100vh;
}
</style>
