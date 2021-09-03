<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label v-for="dough in doughs" :class="dough.class" :key="dough.id">
          <RadioButton
            name="dough"
            class="visually-hidden"
            :value="dough.name"
            :checked="dough.id === pizza.dough.id"
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
import { mapGetters, mapActions } from "vuex";

export default {
  name: "BuilderDoughSelector",
  components: {
    RadioButton,
  },
  methods: {
    ...mapActions("builder", {
      setPizzaDough: "setDough",
    }),
    setDough(doughName) {
      this.setPizzaDough(doughName);
    },
  },
  computed: {
    ...mapGetters("builder", {
      pizza: "pizza",
      doughs: "doughs",
    }),
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
