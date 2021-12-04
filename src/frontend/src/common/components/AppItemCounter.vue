<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :class="isDecrementDisabled ? 'counter__button--disabled' : ''"
      :disabled="isDecrementDisabled"
      @click="decrement"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      disabled
      :value="count"
    >
    <button
      type="button"
      class="counter__button counter__button--plus"
      :class="isIncrementDisabled ? 'counter__button--disabled' : ''"
      :disabled="isIncrementDisabled"
      @click="increment"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>
<script>
import { INGREDIENT_MAX_COUNT, INGREDIENT_MIN_COUNT } from "../const/common";

export default {
  name: "AppItemCounter",

  props: {
    itemId: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },

  computed: {
    isIncrementDisabled: function () {
      return this.count === INGREDIENT_MAX_COUNT;
    },

    isDecrementDisabled: function () {
      return this.count === INGREDIENT_MIN_COUNT;
    },
  },

  methods: {
    increment() {
      this.$emit("setCount", this.itemId, this.count + 1);
    },

    decrement() {
      this.$emit("setCount", this.itemId, this.count - 1);
    },
  },
};
</script>
