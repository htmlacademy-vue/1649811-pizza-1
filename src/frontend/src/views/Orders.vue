<template>
  <AppSideBar>
    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">История заказов</h1>
      </div>

      <section class="sheet order">
        <div class="order__wrapper">
          <div class="order__number">
            <b>Заказ #11199929</b>
          </div>

          <div class="order__sum">
            <span>Сумма заказа: 1 564 ₽</span>
          </div>

          <div class="order__button">
            <button type="button" class="button button--border">Удалить</button>
          </div>
          <div class="order__button">
            <button type="button" class="button">Повторить</button>
          </div>
        </div>

        <ul class="order__list">
          <li class="order__item">
            <div class="product">
              <img
                src="@/assets/img/product.svg"
                class="product__img"
                width="56"
                height="56"
                alt="Капричоза"
              />
              <div class="product__text">
                <h2>Капричоза</h2>
                <ul>
                  <li>30 см, на тонком тесте</li>
                  <li>Соус: томатный</li>
                  <li>
                    Начинка: грибы, лук, ветчина, пармезан, ананас, бекон, блю
                    чиз
                  </li>
                </ul>
              </div>
            </div>

            <p class="order__price">782 ₽</p>
          </li>
          <li class="order__item">
            <div class="product">
              <img
                src="@/assets/img/product.svg"
                class="product__img"
                width="56"
                height="56"
                alt="Капричоза"
              />
              <div class="product__text">
                <h2>Моя любимая</h2>
                <ul>
                  <li>30 см, на тонком тесте</li>
                  <li>Соус: томатный</li>
                  <li>Начинка: грибы, лук, ветчина, пармезан, ананас</li>
                </ul>
              </div>
            </div>

            <p class="order__price">2х782 ₽</p>
          </li>
        </ul>

        <ul class="order__additional">
          <li>
            <img
              src="@/assets/img/cola.svg"
              width="20"
              height="30"
              alt="Coca-Cola 0,5 литра"
            />
            <p>
              <span>Coca-Cola 0,5 литра</span>
              <b>56 ₽</b>
            </p>
          </li>
          <li>
            <img
              src="@/assets/img/sauce.svg"
              width="20"
              height="30"
              alt="Острый соус"
            />
            <span>Острый соус <br />30 ₽</span>
          </li>
          <li>
            <img
              src="@/assets/img/potato.svg"
              width="20"
              height="30"
              alt="Картошка из печи"
            />
            <p>
              <span>Картошка из печи</span>
              <b>170 ₽</b>
            </p>
          </li>
        </ul>

        <p class="order__address">
          Адрес доставки: Тест (или если адрес новый - писать целиком)
        </p>
      </section>

      <section v-for="order in orders" :key="order.id" class="sheet order">
        <div class="order__wrapper">
          <div class="order__number">
            <b>Заказ #{{ order.id }}</b>
          </div>

          <div class="order__sum">
            <span>Сумма заказа: XZ ₽</span>
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
      </section>
    </div>
  </AppSideBar>
</template>

<script>
import AppSideBar from "../layouts/AppSideBar";
import resources from "../common/enums/resources";
import { Message } from "../common/const/common";

export default {
  data() {
    return {
      orders: [],
    };
  },
  components: { AppSideBar },
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
  async mounted() {
    this.orders = await this.$api[resources.ORDERS].get();

    console.log(this.orders);
  },
};
</script>
