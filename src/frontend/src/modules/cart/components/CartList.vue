<template>
  <ul class="cart-list sheet">
    <li v-for="product in items" :key="product.id" class="cart-list__item">
      <div class="product cart-list__product">
        <img
          src="/public/img/product.svg"
          class="product__img"
          width="56"
          height="56"
          :alt="product.name"
        />
        <div class="product__text">
          <h2>{{ product.name }}</h2>
          <ul>
            <li>{{ product.size.name }}, {{ printDough(product) }}</li>
            <li>Соус: {{ product.sauce.name.toLowerCase() }}</li>
            <li>Начинка: {{ printIngredients(product) }}</li>
          </ul>
        </div>
      </div>

      <div class="counter cart-list__counter">
        <button
          type="button"
          class="counter__button counter__button--minus"
          :data-id="product.id"
          @click="handleDecrement"
        >
          <span class="visually-hidden">Меньше</span>
        </button>
        <input
          type="text"
          name="counter"
          class="counter__input"
          :value="product.count"
          :data-id="product.id"
          @change="handleInputCountChange"
        />
        <button
          type="button"
          class="counter__button counter__button--plus counter__button--orange"
          :data-id="product.id"
          @click="handleIncrement"
        >
          <span class="visually-hidden">Больше</span>
        </button>
      </div>

      <div class="cart-list__price">
        <b>{{ product.price * product.count }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button
          type="button"
          class="cart-list__edit"
          :data-id="product.id"
          @click="handleButtonChangeClick"
        >
          Изменить
        </button>
      </div>
    </li>
  </ul>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { AppRoute } from "../../../common/constants";

export default {
  name: "CartList",
  computed: {
    ...mapGetters("cart", {
      items: "getItems",
    }),
  },
  methods: {
    ...mapActions("cart", {
      changePizza: "changePizza",
      incrementProduct: "increment",
      decrementProduct: "decrement",
      changeProductCount: "changeCount",
    }),
    handleSubmit() {
      console.log("submit");
    },
    handleButtonChangeClick(event) {
      const { id } = event.target.dataset;
      this.changePizza(id);
      this.$router.push(AppRoute.MAIN);
    },
    handleIncrement(event) {
      const { id } = event.target.dataset;
      this.incrementProduct(id);
    },
    handleDecrement(event) {
      const { id } = event.target.dataset;
      this.decrementProduct(id);
    },
    handleInputCountChange(event) {
      const {
        dataset: { id },
        value: count,
      } = event.target;
      this.changeProductCount({ id, count });
    },
    printIngredients({ ingredients }) {
      return ingredients.map((item) => item.name.toLowerCase()).join(", ");
    },
    printDough({ dough }) {
      const data = dough.name === "Тонкое" ? "тонком" : "толстом";
      return `на ${data} тесте`;
    },
  },
};
</script>
