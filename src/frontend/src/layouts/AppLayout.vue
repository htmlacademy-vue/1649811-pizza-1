<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
import AppLayoutHeader from "./AppLayoutHeader";

const defaultLayout = "AppLayoutDefault";

export default {
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`./${layout}.vue`);
    },
  },
  components: {
    AppLayoutHeader,
  },
};
</script>
