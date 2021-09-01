<template>
  <section class="footer">
    <div class="footer__more">
      <router-link
        :to="builderLink"
        class="button button--border button--arrow"
      >
        Хочу еще одну
      </router-link>
    </div>
    <p class="footer__text">
      Перейти к конструктору<br />чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b>Итого: {{ cartPrice }} ₽</b>
    </div>

    <div class="footer__submit">
      <button type="submit" class="button" @click.prevent="handleSubmit">
        Оформить заказ
      </button>
    </div>

    <template v-if="isShowPopup">
      <Popup @close="handleClose" />
    </template>
  </section>
</template>
<script>
import { AppRoute } from "../../../common/constants";
import { mapGetters } from "vuex";
import Popup from "../../../common/components/Popup";

export default {
  name: "CartFooter",
  data() {
    return {
      builderLink: AppRoute.MAIN,
      isShowPopup: false,
    };
  },
  components: { Popup },
  computed: {
    ...mapGetters("cart", {
      cartPrice: "price",
    }),
  },
  methods: {
    handleSubmit() {
      console.log("submit");
      this.isShowPopup = true;
    },
    handleClose() {
      this.isShowPopup = false;
    },
  },
};
</script>
