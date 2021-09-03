<template>
  <div class="full-height">
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
<style lang="scss">
.full-height {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
