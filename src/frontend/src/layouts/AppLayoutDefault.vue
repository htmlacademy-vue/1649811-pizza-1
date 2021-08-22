<template>
  <div>
    <AppLayoutHeader :login-path="loginPath" />
    <slot />
  </div>
</template>
<script>
import AppLayoutHeader from "./AppLayoutHeader";

export default {
  props: {
    loginPath: {
      type: String,
      required: true,
    },
  },
  components: { AppLayoutHeader },
};
</script>
