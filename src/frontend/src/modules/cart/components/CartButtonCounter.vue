<template>
  <div class="counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :data-id="id"
      @click="handleDecrement"
      :disabled="isDisabled"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="count"
      :data-id="id"
      @change="handleChange"
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
import { INGREDIENT_MIN_COUNT } from "../../../common/const/common";

export default {
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
  computed: {
    isDisabled() {
      return this.count === INGREDIENT_MIN_COUNT;
    },
  },
  methods: {
    handleIncrement(event) {
      const { id } = event.target.dataset;
      this.$emit("increment", id);
    },

    handleDecrement(event) {
      const { id } = event.target.dataset;
      this.$emit("decrement", id);
    },

    handleChange(event) {
      const {
        dataset: { id },
        value,
      } = event.target;
      const count = parseInt(value, 10);
      this.$emit("change", { id, count });
    },
  },
};
</script>
