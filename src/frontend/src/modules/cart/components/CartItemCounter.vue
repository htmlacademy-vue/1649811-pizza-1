<template>
  <div class="counter cart-list__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :data-id="id"
      @click="handleDecrement"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="count"
      :data-id="id"
      @change="handleInputCountChange"
    />
    <button
      type="button"
      class="counter__button counter__button--plus counter__button--orange"
      :data-id="id"
      @click="handleIncrement"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "CartItemCounter",
  props: {
    count: {
      type: Number,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    ...mapActions("cart", ["increment", "decrement", "changeCount"]),
    handleIncrement(event) {
      const { id } = event.target.dataset;
      this.increment(id);
    },
    handleDecrement(event) {
      const { id } = event.target.dataset;
      this.decrement(id);
    },
    handleInputCountChange(event) {
      const {
        dataset: { id },
        value: count,
      } = event.target;
      this.changeCount({ id, count });
    },
  },
};
</script>
