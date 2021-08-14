<template>
  <div>
    <app-layout-header></app-layout-header>
    <index></index>
  </div>
</template>

<script>
import AppLayoutHeader from "./AppLayoutHeader";
import Index from "@/views/Index";

export default {
  components: {
    AppLayoutHeader,
    Index,
  },
};
</script>
