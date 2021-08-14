<template>
  <div class="content__result">
    <p>Итого: {{ price }} ₽</p>
    <button
      type="button"
      class="button"
      :class="isDisabled ? 'button--disabled' : ''"
      :disabled="isDisabled"
    >
      Готовьте!
    </button>
  </div>
</template>
<script>
export default {
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isDisabled() {
      return !this.pizza.name.length || !this.pizza.price;
    },
    price() {
      const sum = this.pizza.ingredients.reduce(
        (acc, item) => acc + item.count * item.price,
        0
      );

      const result = sum * this.pizza.size.multiplier;
      this.$emit("setPrice", result);

      return result;
    },
  },
};
</script>
<style lang="scss" scoped>
.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}

.button {
  $bl: &;

  @include b-s18-h21;
  font-family: inherit;
  display: block;

  box-sizing: border-box;
  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: 0.3s;
  text-align: center;

  color: $white;
  border: none;
  border-radius: 8px;
  outline: none;
  box-shadow: $shadow-medium;

  background-color: $green-500;

  &:hover:not(:active):not(#{$bl}--disabled) {
    background-color: $green-400;
  }

  &:active:not(#{$bl}--disabled) {
    background-color: $green-600;
  }

  &:focus:not(#{$bl}--disabled) {
    opacity: 0.5;
  }

  &--disabled {
    background-color: $green-300;
    color: rgba($white, 0.2);
    cursor: default;
  }

  &--border {
    background-color: transparent;
    border: 1px solid $green-500;
    color: $black;
    box-shadow: none;

    &:hover:not(:active):not(#{$bl}--disabled) {
      color: $green-500;
      border-color: $green-500;
      background-color: transparent;
    }

    &:active:not(#{$bl}--disabled) {
      color: $green-600;
      border-color: $green-600;
      background-color: transparent;
    }

    &#{$bl}--disabled {
      opacity: 0.5;
    }
  }

  &--transparent {
    @include b-s14-h16;
    background-color: transparent;
    box-shadow: none;
    color: $black;

    &:hover:not(:active):not(#{$bl}--disabled) {
      color: $red-800;
      background-color: transparent;
    }

    &:active:not(#{$bl}--disabled) {
      color: $red-900;
      background-color: transparent;
    }

    &#{$bl}--disabled {
      opacity: 0.25;
    }
  }

  &--arrow {
    &::before {
      content: "";
      background-image: url("~@/assets/img/button-arrow.svg");
      background-position: center;
      background-repeat: no-repeat;
      margin-right: 16px;
      width: 18px;
      height: 18px;
      display: inline-block;
      vertical-align: middle;
      transform: translateY(-1px);
    }
  }

  &--white {
    background-color: $white;
    color: $green-500;
  }
}
</style>
