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
          @setIngredient="setIngredient"
        >
          <BuilderSauceSelector
            :current-sauce="sauce"
            :sauces="sauces"
            @setSauce="setSauce"
          />
        </BuilderIngredientsSelector>

        <BuilderPizzaView
          :pizza="pizza"
          @setName="setName"
          :drop="addIngredient"
        >
          <BuilderPriceCounter :pizza="pizza" @setPrice="setPrice" />
        </BuilderPizzaView>
      </div>
    </form>
  </main>
</template>

<script>
import BuilderDoughSelector from "../modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "../modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "../modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "../modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "../modules/builder/components/BuilderPriceCounter";
import BuilderSauceSelector from "../modules/builder/components/BuilderSauceSelector";

export default {
  props: {
    doughs: {
      type: Array,
      required: true,
    },
    sizes: {
      type: Array,
      required: true,
    },
    sauces: {
      type: Array,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
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
    BuilderSauceSelector,
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
    addIngredient(ingredient) {
      const dragIngredient = this.ingredients.find(
        (item) => item.id === ingredient.id
      );
      dragIngredient.count++;
    },
    setIngredient(ingredientId, count) {
      const changedIngredient = this.ingredients.find(
        (item) => item.id === ingredientId
      );
      changedIngredient.count = count;
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
