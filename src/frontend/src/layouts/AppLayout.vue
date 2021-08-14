<template>
  <div>
    <AppLayoutHeader></AppLayoutHeader>
    <Index
      :doughs="doughs"
      :sizes="sizes"
      :sauces="sauces"
      :ingredients="ingredients"
    ></Index>
  </div>
</template>

<script>
import AppLayoutHeader from "./AppLayoutHeader";
import Index from "../views/Index";

export default {
  props: {
    doughs: {
      type: Array,
      required: true,
    },
    sizes: {
      type: Array,
      required: true,
    },
    sauces: {
      type: Array,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
  },
  components: {
    AppLayoutHeader,
    Index,
  },
};
</script>
