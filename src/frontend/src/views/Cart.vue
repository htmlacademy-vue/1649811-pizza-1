<template>
  <form
    action="#"
    method="post"
    class="layout-form"
    @submit.prevent="handleSubmit"
  >
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div v-if="!items.length" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>

        <ul v-else class="cart-list sheet">
          <li v-for="pizza in items" :key="pizza.id" class="cart-list__item">
            <div class="product cart-list__product">
              <img
                src="/public/img/product.svg"
                class="product__img"
                width="56"
                height="56"
                :alt="pizza.name"
              />
              <div class="product__text">
                <h2>{{ pizza.name }}</h2>
                <ul>
                  <li>{{ pizza.size.name }}, {{ printDough(pizza) }}</li>
                  <li>Соус: {{ pizza.sauce.name.toLowerCase() }}</li>
                  <li>Начинка: {{ printIngredients(pizza) }}</li>
                </ul>
              </div>
            </div>

            <div class="counter cart-list__counter">
              <button
                type="button"
                class="counter__button counter__button--minus"
                :data-id="pizza.id"
                @click="handleDecrement"
              >
                <span class="visually-hidden">Меньше</span>
              </button>
              <input
                type="text"
                name="counter"
                class="counter__input"
                :value="pizza.count"
                :data-id="pizza.id"
                @change="handleInputCountChange"
              />
              <button
                type="button"
                class="
                  counter__button counter__button--plus counter__button--orange
                "
                :data-id="pizza.id"
                @click="handleIncrement"
              >
                <span class="visually-hidden">Больше</span>
              </button>
            </div>

            <div class="cart-list__price">
              <b>{{ pizza.price * pizza.count }} ₽</b>
            </div>

            <div class="cart-list__button">
              <button
                type="button"
                class="cart-list__edit"
                :data-id="pizza.id"
                @click="handleButtonChangeClick"
              >
                Изменить
              </button>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </form>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { AppRoute } from "../common/constants";

export default {
  computed: {
    ...mapGetters("cart", {
      items: "getItems",
    }),
  },
  methods: {
    ...mapActions("cart", {
      changePizza: "changePizza",
      incItem: "increment",
      decItem: "decrement",
      changeCount: "changeCount",
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
      this.incItem(id);
    },
    handleDecrement(event) {
      const { id } = event.target.dataset;
      this.decItem(id);
    },
    handleInputCountChange(event) {
      const {
        dataset: { id },
        value: count,
      } = event.target;
      this.changeCount({ id, count });
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
