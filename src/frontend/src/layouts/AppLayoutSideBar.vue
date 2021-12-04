<template>
  <AppLayoutDefault>
    <AppSideBar>
      <slot />
    </AppSideBar>
  </AppLayoutDefault>
</template>
<script>
import AppLayoutDefault from "./AppLayoutDefault";
export default {
  name: "AppLayoutSideBar",
  components: { AppLayoutDefault },
};
</script>
