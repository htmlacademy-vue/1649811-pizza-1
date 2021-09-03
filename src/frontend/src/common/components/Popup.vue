<template>
  <Modal>
    <div class="popup">
      <a href="#" class="close" @click="handleClose">
        <span class="visually-hidden">Закрыть попап</span>
      </a>
      <div class="popup__title">
        <h2 class="title">Спасибо за заказ</h2>
      </div>
      <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
      <div class="popup__button">
        <a href="#" class="button" @click="handleClose">Отлично, я жду!</a>
      </div>
    </div>
  </Modal>
</template>
<script>
import Modal from "./Modal";

export default {
  components: { Modal },
  methods: {
    handleClose() {
      this.$emit("close");
    },
  },
};
</script>
