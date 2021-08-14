<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector
          :doughs="doughs"
          :current-dough="dough"
          @setDough="setDough"
        />

        <BuilderSizeSelector
          :sizes="sizes"
          :current-size="size"
          @setSize="setSize"
        />

        <BuilderIngredientsSelector
          :ingredients="ingredients"
          :sauces="sauces"
          :current-sauce="sauce"
          @setSauce="setSauce"
        />

        <BuilderPizzaView
          :dough="dough"
          :sauce="sauce"
          :size="size"
          :ingredients="addedIngredients"
          :name="name"
          :pizza="pizza"
          @setName="setName"
        >
          <template #result>
            <BuilderPriceCounter
              :ingredients="addedIngredients"
              :multiplier="size.multiplier"
              :name="name"
              :pizza="pizza"
              @setPrice="setPrice"
            />
          </template>
        </BuilderPizzaView>
      </div>
    </form>
  </main>
</template>

<script>
import pizza from "@/static/pizza.json";
import {
  normalizeDough,
  normalizeSize,
  normalizeIngredient,
} from "@/common/helpers";

import BuilderDoughSelector from "../modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "../modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "../modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "../modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "../modules/builder/components/BuilderPriceCounter";

export default {
  data() {
    return {
      doughs: pizza.dough.map((item) => normalizeDough(item)),
      sizes: pizza.sizes.map((item) => normalizeSize(item)),
      sauces: pizza.sauces,
      ingredients: pizza.ingredients.map((item) => normalizeIngredient(item)),

      dough: {},
      sauce: {},
      size: {},
      price: 0,
      name: "",
    };
  },
  created() {
    this.dough = this.doughs[0];
    this.sauce = this.sauces[0];
    this.size = this.sizes[0];
  },
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },
  methods: {
    setDough(dough) {
      this.dough = dough;
    },
    setSauce(sauce) {
      this.sauce = sauce;
    },
    setSize(size) {
      this.size = size;
    },
    setPrice(price) {
      this.price = price;
    },
    setName(name) {
      this.name = name;
    },
  },
  computed: {
    addedIngredients() {
      return this.ingredients.filter((item) => item.count > 0);
    },
    pizza() {
      return {
        name: this.name,
        dough: this.dough,
        sauce: this.sauce,
        size: this.size,
        ingredients: this.addedIngredients,
        price: this.price,
      };
    },
  },
};
</script>
