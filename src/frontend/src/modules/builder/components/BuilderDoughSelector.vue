<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label v-for="dough in doughs" :class="dough.class" :key="dough.id">
          <RadioButton
            :value="dough.name"
            name="dough"
            :class-name="'visually-hidden'"
            :checked="dough.id === currentDough.id"
            @handleChoice="setDough"
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "../../../common/components/RadioButton";

export default {
  name: "BuilderDoughSelector",
  props: {
    doughs: {
      type: Array,
      required: true,
    },
    currentDough: {
      type: Object,
      required: true,
    },
  },
  components: {
    RadioButton,
  },
  methods: {
    setDough(doughName) {
      const dough = this.doughs.find((item) => item.name === doughName);
      this.$emit("setDough", dough);
    },
  },
};
</script>

<style lang="scss" scoped>
.content__dough {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}
</style>
