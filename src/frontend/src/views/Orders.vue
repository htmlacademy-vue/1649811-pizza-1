<template>
  <AppSideBar>
    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">История заказов</h1>
      </div>

      <section v-for="order in orders" :key="order.id" class="sheet order">
        <div class="order__wrapper">
          <div class="order__number">
            <b>Заказ #{{ order.id }}</b>
          </div>

          <div class="order__sum">
            <span>Сумма заказа: {{ order.price }} ₽</span>
          </div>

          <div class="order__button">
            <button
              :data-id="order.id"
              type="button"
              class="button button--border"
              @click="handleRemove"
            >
              Удалить
            </button>
          </div>
          <div class="order__button">
            <button :data-id="order.id" type="button" class="button">
              Повторить
            </button>
          </div>
        </div>

        <ul class="order__list">
          <OrderPizzaItem
            v-for="(pizza, index) in order.pizzas"
            :key="`${index}-${pizza.price}`"
            :pizza="pizza"
          />
        </ul>

        <ul class="order__additional">
          <OrderAdditionalItem
            v-for="product in order.additional"
            :key="product.id"
            :product="product"
          />
        </ul>

        <p v-if="order.address" class="order__address">
          Адрес доставки: {{ order.address }}
        </p>
      </section>
    </div>
  </AppSideBar>
</template>

<script>
import { mapGetters } from "vuex";
import AppSideBar from "../layouts/AppSideBar";
import resources from "../common/enums/resources";
import { Message } from "../common/const/common";
import {
  prepareAdditional,
  prepareAddress,
  preparePizza,
} from "../modules/order/helpers/prepare-order-data";
import OrderPizzaItem from "../modules/order/components/OrderPizzaItem";
import OrderAdditionalItem from "../modules/order/components/OrderAdditionalItem";

export default {
  data() {
    return {
      orders: [],
    };
  },
  components: { OrderAdditionalItem, OrderPizzaItem, AppSideBar },
  methods: {
    async handleRemove(evt) {
      const { id } = evt.target.dataset;
      try {
        await this.$api[resources.ORDERS].delete(id);
        this.$notifier.success(Message.ORDER_DELETE_SUCCESS);
        this.orders = this.orders.filter((item) => item.id !== +id);
      } catch (e) {
        this.$notifier.error(Message.SERVER_ERROR);
      }
    },
  },
  computed: {
    ...mapGetters({
      sauces: "builder/sauces",
      ingredients: "builder/ingredients",
      dough: "builder/doughs",
      sizes: "builder/sizes",
      additional: "cart/getMisc",
    }),
  },
  async mounted() {
    const orders = await this.$api[resources.ORDERS].get();

    this.orders = await Promise.all(
      orders.map(async (order) => {
        const { id, orderPizzas, orderAddress, orderMisc = null } = order;
        let orderPrice = 0;

        const { additional, additionalPrice } = await prepareAdditional(
          this.additional,
          orderMisc
        );
        orderPrice += additionalPrice;

        const pizzas = await Promise.all(
          orderPizzas.map(async (orderPizza) => {
            const pizza = await preparePizza(
              orderPizza,
              this.sauces,
              this.dough,
              this.sizes,
              this.ingredients
            );
            orderPrice += pizza.price * pizza.count;
            return pizza;
          })
        );

        const address = orderAddress
          ? await prepareAddress(orderAddress)
          : null;

        return {
          id,
          address,
          pizzas,
          additional,
          price: orderPrice,
        };
      })
    );
  },
};
</script>
