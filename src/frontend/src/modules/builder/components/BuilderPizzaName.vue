<template>
  <label class="input">
    <span class="visually-hidden">Название пиццы</span>
    <input
      type="text"
      name="pizza_name"
      placeholder="Введите название пиццы"
      :value="name"
      @input="setName"
    />
  </label>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
  },
  methods: {
    setName(event) {
      const name = event.target.value;
      this.$emit("setName", name);
    },
  },
};
</script>
