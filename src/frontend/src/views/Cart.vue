<template>
  <form action="#" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div v-if="!items.length" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>

        <template v-else>
          <CartList />
        </template>

        <CartAdditional />

        <CartOrder />
      </div>
    </main>

    <CartFooter />
  </form>
</template>
<script>
import { mapGetters } from "vuex";
import CartList from "../modules/cart/components/CartList";
import CartAdditional from "../modules/cart/components/CartAdditional";
import CartOrder from "../modules/cart/components/CartOrder";
import CartFooter from "../modules/cart/components/CartFooter";

export default {
  components: { CartList, CartOrder, CartAdditional, CartFooter },
  computed: {
    ...mapGetters("cart", {
      items: "getItems",
    }),
  },
};
</script>
