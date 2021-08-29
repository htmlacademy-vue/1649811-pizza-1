<template>
  <div>
    <AppLayoutHeader />
    <slot />
  </div>
</template>
<script>
import AppLayoutHeader from "./AppLayoutHeader";

export default {
  components: { AppLayoutHeader },
};
</script>
