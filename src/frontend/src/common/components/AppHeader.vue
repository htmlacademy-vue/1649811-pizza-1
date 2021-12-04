<template>
  <header class="header">
    <div class="header__logo">
      <router-link
        :to="AppRoute.MAIN"
        class="logo"
      >
        <img
          class="header__logo__image"
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
        >
      </router-link>
    </div>
    <div class="header__cart">
      <router-link
        :to="AppRoute.CART"
        :class="cartLinkClass"
      >
        {{ price }} ₽
      </router-link>
    </div>
    <div class="header__user">
      <template v-if="user">
        <router-link :to="AppRoute.PROFILE">
          <picture>
            <img
              :src="user.avatar"
              :alt="user.name"
              width="32"
              height="32"
            >
          </picture>

          <span>{{ user.name }}</span>
        </router-link>

        <router-link
          to="#"
          class="header__logout"
          @click.prevent.native="$logout"
        >
          <span>Выйти</span>
        </router-link>
      </template>

      <template v-else>
        <router-link
          :to="loginPath"
          class="header__login"
        >
          <span>Войти</span>
        </router-link>
      </template>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import { logout } from "../mixins";
import { AppRoute } from "../const/route";

export default {
  name: "AppHeader",

  mixins: [logout],

  data() {
    return {
      AppRoute,
    };
  },

  computed: {
    ...mapGetters({
      user: "auth/getUser",
      price: "cart/price",
    }),

    loginPath() {
      return this.$route.path === AppRoute.MAIN
        ? AppRoute.LOGIN_INDEX
        : AppRoute.LOGIN;
    },

    cartLinkClass() {
      return this.$route.path === AppRoute.CART ? "disabled" : "";
    },
  },
};
</script>

<style lang="scss" scoped>
$loginImage: null;
@mixin logo($image) {
  display: inline-block;

  width: 32px;
  height: 32px;
  margin-right: 8px;

  content: "";
  vertical-align: middle;

  @if ($image) {
    background: url($image) no-repeat center;
    background-size: auto 50%;
  }
}

.disabled {
  pointer-events: none;
  background-color: $green-600 !important;
  color: $green-200 !important;
  background-image: url("~@/assets/img/cart-active.svg") !important;
}

.header__user {
  display: flex;
  align-items: center;

  a {
    display: block;

    padding-top: 14px;
    padding-right: 20px;
    padding-bottom: 14px;
    padding-left: 20px;

    transition: 0.3s;

    background-color: $green-500;

    &:hover:not(:active) {
      background-color: $green-400;
    }

    &:active {
      background-color: $green-600;
    }

    &:focus {
      opacity: 0.5;
    }
  }

  img {
    display: inline-block;

    width: 32px;
    height: 32px;
    margin-right: 8px;

    vertical-align: middle;

    border-radius: 50%;
  }

  span {
    @include r-s14-h16;

    display: inline-block;

    vertical-align: middle;

    color: $white;
  }
}

.header__logout {
  &::before {
    @include logo($loginImage);
  }
}

.header__login {
  &::after {
    @include logo($loginImage);
  }
}

.header__logo__image {
  width: 90px;
  height: 40px;
}
</style>
