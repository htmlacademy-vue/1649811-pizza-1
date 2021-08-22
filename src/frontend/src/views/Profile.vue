<template>
  <main class="layout">
    <div class="layout__sidebar sidebar temp-style">
      <a href="index.html" class="logo layout__logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </a>

      <a class="layout__link" href="#">История заказов</a>
      <a class="layout__link layout__link--active" href="#">Мои данные</a>
    </div>

    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">Мои данные</h1>
      </div>

      <div class="user">
        <picture>
          <source
            type="image/webp"
            srcset="
              @/assets/img/users/user5@2x.webp 1x,
              @/assets/img/users/user5@4x.webp 2x
            "
          />
          <img
            src="@/assets/img/users/user5@2x.jpg"
            srcset="@/assets/img/users/user5@4x.jpg"
            alt="Василий Ложкин"
            width="72"
            height="72"
          />
        </picture>
        <div class="user__name">
          <span>Василий Ложкин</span>
        </div>
        <p class="user__phone">
          Контактный телефон: <span>+7 999-999-99-99</span>
        </p>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.temp-style {
  z-index: -1 !important;
}
</style>
