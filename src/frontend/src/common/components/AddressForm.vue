<template>
  <form
    action="#"
    method="post"
    class="address-form address-form--opened sheet"
    @submit.prevent
  >
    <div class="address-form__header">
      <b>Адрес {{ number }}</b>
    </div>

    <div class="address-form__wrapper">
      <div class="address-form__input">
        <label class="input">
          <span>Название адреса*</span>
          <input
            type="text"
            name="name"
            placeholder="Введите название адреса"
            v-model="name"
            required
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--normal">
        <label class="input">
          <span>Улица*</span>
          <input
            type="text"
            name="street"
            placeholder="Введите название улицы"
            v-model="street"
            required
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Дом*</span>
          <input
            type="text"
            name="house"
            placeholder="Введите номер дома"
            v-model="building"
            required
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Квартира</span>
          <input
            type="text"
            name="apartment"
            placeholder="Введите № квартиры"
            v-model="flat"
          />
        </label>
      </div>
      <div class="address-form__input">
        <label class="input">
          <span>Комментарий</span>
          <input
            type="text"
            name="comment"
            placeholder="Введите комментарий"
            v-model="comment"
          />
        </label>
      </div>
    </div>

    <div class="address-form__buttons">
      <button type="button" class="button button--transparent" @click="remove">
        Удалить
      </button>
      <button type="submit" class="button" @click="submit">Сохранить</button>
    </div>
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import validator from "../mixins/validator";
import { getValidationErrorMessage } from "../utils/helpers";
import resources from "../enums/resources";
import { AddressValidations } from "../const/validation";
import { DefaultAddress, Message } from "../const/common";

export default {
  name: "AddressForm",
  mixins: [validator],
  data() {
    return {
      name: this.address.name,
      street: this.address.street,
      building: this.address.building,
      flat: this.address.flat,
      comment: this.address.comment,
      validations: { ...AddressValidations },
    };
  },
  props: {
    address: {
      type: Object,
      default: () => DefaultAddress,
    },
    number: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/getUser",
    }),
  },
  watch: {
    name() {
      this.$clearValidationErrors(this.validations);
    },
    street() {
      this.$clearValidationErrors(this.validations);
    },
    building() {
      this.$clearValidationErrors(this.validations);
    },
  },
  methods: {
    async submit() {
      if (
        !this.$validateFields(
          { name: this.name, street: this.street, building: this.building },
          this.validations
        )
      ) {
        const errorMessage = getValidationErrorMessage(this.validations);
        this.$notifier.error(errorMessage);
        return;
      }

      const address = {
        name: this.name,
        userId: this.user.id,
        street: this.street,
        building: this.building,
        flat: this.flat,
        comment: this.comment,
      };

      if (this.address.id) {
        try {
          await this.$api[resources.ADDRESSES].put({
            ...address,
            id: this.addressId,
          });
          this.$notifier.success(Message.ADDRESS_EDIT_SUCCESS);
        } catch (e) {
          this.$notifier.error(Message.SERVER_ERROR);
        }
      } else {
        try {
          await this.$api[resources.ADDRESSES].post(address);
          this.$notifier.success(Message.ADDRESS_ADD_SUCCESS);
        } catch (e) {
          this.$notifier.error(Message.SERVER_ERROR);
        }
      }

      this.$emit("closeForm");
    },
    async remove() {
      if (this.address.id) {
        await this.$api[resources.ADDRESSES].delete(this.address.id);
      }
      this.$emit("closeForm");
    },
  },
};
</script>
