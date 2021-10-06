<template>
  <li class="order__item">
    <ProductListItem :product="pizza" class="product" />

    <p class="order__price">{{ getStringProductPrice(pizza) }} ₽</p>
  </li>
</template>

<script>
import ProductListItem from "../../../common/components/ProductListItem";
import { getStringProductPrice } from "../helpers/common";

export default {
  name: "OrderPizzaItem",
  components: { ProductListItem },
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },
  methods: { getStringProductPrice },
  // computed: {
  //   price() {
  //     return +this.pizza.count === 1
  //       ? this.pizza.price
  //       : `${this.pizza.count}x${this.pizza.price}`;
  //   },
  // },
};
</script>
