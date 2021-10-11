<template>
  <div id="app">
    <AppLayout>
      <transition v-if="isShowTransition" name="slide" appear>
        <router-view />
      </transition>
      <router-view v-else />
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

    isShowTransition() {
      return this.$route.name !== "Profile" && this.$route.name !== "Orders";
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
#app {
  min-height: 100vh;
}
</style>
