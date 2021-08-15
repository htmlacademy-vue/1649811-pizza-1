<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <label
      v-for="sauce in sauces"
      :key="sauce.id"
      class="radio ingredients__input"
    >
      <RadioButton
        name="sauce"
        :value="sauce.name"
        :checked="sauce.id === currentSauce.id"
        @handleChoice="setSauce"
      />
      <span>{{ sauce.name }}</span>
    </label>
  </div>
</template>
<script>
import RadioButton from "../../../common/components/RadioButton";
export default {
  name: "BuilderSauceSelector",
  components: { RadioButton },
  props: {
    sauces: {
      type: Array,
      required: true,
    },
    currentSauce: {
      type: Object,
      required: true,
    },
  },
  methods: {
    setSauce(sauceName) {
      const sauce = this.sauces.find((item) => item.name === sauceName);
      this.$emit("setSauce", sauce);
    },
  },
};
</script>
<style lang="scss" scoped>
.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}
</style>
