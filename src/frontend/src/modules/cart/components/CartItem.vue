<template>
  <li class="cart-list__item">
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
          <li>{{ product.size.name }}, {{ dough }}</li>
          <li>Соус: {{ sauce }}</li>
          <li>Начинка: {{ ingredients }}</li>
        </ul>
      </div>
    </div>

    <CartItemCounter :id="+product.id" :count="+product.count" />

    <div class="cart-list__price">
      <b>{{ product.price * product.count }} ₽</b>
    </div>

    <div class="cart-list__button">
      <CartButtonChange :id="+product.id" />
    </div>
  </li>
</template>
<script>
import CartItemCounter from "./CartItemCounter";
import CartButtonChange from "./CartButtonChange";

export default {
  name: "CartItem",
  components: { CartItemCounter, CartButtonChange },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ingredients() {
      return this.product.ingredients
        .map((item) => item.name.toLowerCase())
        .join(", ");
    },
    sauce() {
      return this.product.sauce.name.toLowerCase();
    },
    dough() {
      const doughName =
        this.product.dough.name === "Тонкое" ? "тонком" : "толстом";
      return `на ${doughName} тесте`;
    },
  },
};
</script>
