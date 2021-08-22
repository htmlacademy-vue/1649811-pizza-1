<template>
  <div>
    <component :is="layout" :login-path="loginPath">
      <slot />
    </component>
  </div>
</template>

<script>
import AppLayoutHeader from "./AppLayoutHeader";
import Index from "../views/Index";

const defaultLayout = "AppLayoutDefault";

export default {
  props: {
    loginPath: {
      type: String,
      required: true,
    },
  },
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`./${layout}.vue`);
    },
  },
  components: {
    AppLayoutHeader,
    Index,
  },
};
</script>
