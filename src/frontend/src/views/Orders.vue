<template>
  <main class="layout">
    <div class="layout__sidebar sidebar temp-style">
      <a href="/" class="logo layout__logo">
        <img src="" alt="V!U!E! Pizza logo" width="90" height="40" />
      </a>

      <a class="layout__link layout__link--active" href="#">История заказов</a>
      <a class="layout__link" href="#">Мои данные</a>
    </div>

    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">История заказов</h1>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.temp-style {
  z-index: -1 !important;
}
</style>
