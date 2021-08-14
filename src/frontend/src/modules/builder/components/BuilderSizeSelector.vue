<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label v-for="size in sizes" :key="size.id" :class="size.class">
          <RadioButton
            name="diameter"
            :value="size.name"
            :class-name="'visually-hidden'"
            :checked="currentSize.id === size.id"
            @handleChoice="setSize"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "../../../common/components/RadioButton";

export default {
  components: { RadioButton },
  props: {
    sizes: {
      type: Array,
      required: true,
    },
    currentSize: {
      type: Object,
      required: true,
    },
  },
  methods: {
    setSize(sizeName) {
      const size = this.sizes.find((item) => item.name === sizeName);
      this.$emit("setSize", size);
    },
  },
};
</script>

<style lang="scss" scoped>
.content__diameter {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
