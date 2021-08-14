<template>
  <input
    type="radio"
    :name="name"
    :value="value"
    :class="className"
    :checked="checked"
    @change="handleChoice"
  />
</template>
<script>
export default {
  name: "RadioButton",
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleChoice(event) {
      this.$emit("handleChoice", event.target.value);
    },
  },
};
</script>
