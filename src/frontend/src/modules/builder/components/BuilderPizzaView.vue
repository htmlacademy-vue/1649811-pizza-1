<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        :value="pizza.name"
        @input="setName"
      />
    </label>

    <div class="content__constructor">
      <div class="pizza" :class="pizzaFoundationClass">
        <div class="pizza__wrapper">
          <div
            v-for="ingredient in pizza.ingredients"
            class="pizza__filling"
            :key="ingredient.id"
            :class="getFillingClass(ingredient)"
          />
        </div>
      </div>
    </div>

    <slot name="result" />
  </div>
</template>

<script>
const CLASS_FOUNDATION_PREFIX = "pizza--foundation";
const PIZZA_FILLING_SECOND = "pizza__filling--second";
const PIZZA_FILLING_THIRD = "pizza__filling--third";

export default {
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },

  methods: {
    setName(event) {
      const name = event.target.value;
      this.$emit("setName", name);
    },

    getFillingClass(ingredient) {
      const className = `pizza__${ingredient.class}`;

      switch (ingredient.count) {
        case 1:
          return className;
        case 2:
          return `${className} ${PIZZA_FILLING_SECOND}`;
        case 3:
          return `${className} ${PIZZA_FILLING_THIRD}`;
      }
    },
  },

  computed: {
    pizzaFoundationClass: function () {
      const {
        dough: { name: doughName },
        sauce: { name: sauceName },
      } = this.pizza;

      const size = doughName === "Толстое" ? "big" : "small";
      const sauce = sauceName === "Томатный" ? "tomato" : "creamy";

      return `${CLASS_FOUNDATION_PREFIX}--${size}-${sauce}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/m_center.scss";

.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__constructor {
  width: 315px;
  margin-top: 25px;
  margin-right: auto;
  margin-left: auto;
}

.pizza {
  position: relative;

  display: block;

  box-sizing: border-box;
  width: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--foundation--big-creamy {
    background-image: url("~@/assets/img/foundation/big-creamy.svg");
  }

  &--foundation--big-tomato {
    background-image: url("~@/assets/img/foundation/big-tomato.svg");
  }

  &--foundation--small-creamy {
    background-image: url("~@/assets/img/foundation/small-creamy.svg");
  }

  &--foundation--small-tomato {
    background-image: url("~@/assets/img/foundation/small-tomato.svg");
  }
}

.pizza__wrapper {
  width: 100%;
  padding-bottom: 100%;
}

.pizza__filling {
  position: absolute;
  top: 0;
  left: 0;

  display: block;

  width: 100%;
  height: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--second {
    transform: rotate(45deg);
  }

  &--third {
    transform: rotate(-45deg);
  }

  &--ananas {
    background-image: url("~@/assets/img/filling-big/ananas.svg");
  }

  &--bacon {
    background-image: url("~@/assets/img/filling-big/bacon.svg");
  }

  &--blue_cheese {
    background-image: url("~@/assets/img/filling-big/blue_cheese.svg");
  }

  &--cheddar {
    background-image: url("~@/assets/img/filling-big/cheddar.svg");
  }

  &--chile {
    background-image: url("~@/assets/img/filling-big/chile.svg");
  }

  &--ham {
    background-image: url("~@/assets/img/filling-big/ham.svg");
  }

  &--jalapeno {
    background-image: url("~@/assets/img/filling-big/jalapeno.svg");
  }

  &--mozzarella {
    background-image: url("~@/assets/img/filling-big/mozzarella.svg");
  }

  &--mushrooms {
    background-image: url("~@/assets/img/filling-big/mushrooms.svg");
  }

  &--olives {
    background-image: url("~@/assets/img/filling-big/olives.svg");
  }

  &--onion {
    background-image: url("~@/assets/img/filling-big/onion.svg");
  }

  &--parmesan {
    background-image: url("~@/assets/img/filling-big/parmesan.svg");
  }

  &--salami {
    background-image: url("~@/assets/img/filling-big/salami.svg");
  }

  &--salmon {
    background-image: url("~@/assets/img/filling-big/salmon.svg");
  }

  &--tomatoes {
    background-image: url("~@/assets/img/filling-big/tomatoes.svg");
  }
}
</style>
