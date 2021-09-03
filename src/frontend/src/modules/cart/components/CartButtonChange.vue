<template>
  <button
    type="button"
    class="cart-list__edit"
    :data-id="id"
    @click="handleButtonChangeClick"
  >
    Изменить
  </button>
</template>
<script>
import { mapActions } from "vuex";
import { AppRoute } from "../../../common/constants";

export default {
  name: "CartButtonChange",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    ...mapActions("cart", ["changePizza"]),
    handleButtonChangeClick(event) {
      const { id } = event.target.dataset;
      this.changePizza(id);
      this.$router.push(AppRoute.MAIN);
    },
  },
};
</script>
