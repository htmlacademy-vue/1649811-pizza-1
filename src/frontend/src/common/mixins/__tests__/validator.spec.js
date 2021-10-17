import { enableAutoDestroy, shallowMount } from "@vue/test-utils";
import validator from "../validator";

const Component = {
  render() {},
  mixins: [validator],
  data() {
    return {
      validation: {
        email: {
          error: "",
          rules: ["required", "email"],
        },
        password: {
          error: "",
          rules: ["isNotEmpty"],
        },
        notRules: {
          rules: ["not-rules"],
        },
      },
    };
  },
  props: {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  methods: {
    validate() {
      return this.$validateFields(
        { email: this.email, password: this.password },
        this.validation
      );
    },
  },
};

enableAutoDestroy(afterEach);

describe("Тест миксин $validator - $validateFields", () => {
  let wrapper;

  test("Неверный формат адреса электронной почты", () => {
    wrapper = shallowMount(Component, {
      propsData: {
        email: "email",
        password: "password",
      },
    });

    const isVerify = wrapper.vm.validate();

    expect(isVerify).toBeFalsy();
    expect(wrapper.vm.validation.email.error).toBe(
      "электронная почта имеет неверный формат"
    );
  });

  test("Электронный адрес поле обязательно для заполнения", () => {
    wrapper = shallowMount(Component, {
      propsData: {
        email: "",
        password: "password",
      },
    });

    const isVerify = wrapper.vm.validate();

    expect(isVerify).toBeFalsy();
    expect(wrapper.vm.validation.email.error).toBe(
      "поле обязательно для заполнения"
    );
  });

  test("Электронный адрес все данные правильные", () => {
    wrapper = shallowMount(Component, {
      propsData: {
        email: "test@example.com",
        password: "password",
      },
    });

    const isVerify = wrapper.vm.validate();

    expect(isVerify).toBeTruthy();
    expect(wrapper.vm.validation.email.error).toBe("");
  });

  test("поле не заполнено", () => {
    wrapper = shallowMount(Component, {
      propsData: {
        email: "test@example.com",
        password: "",
      },
    });

    const isVerify = wrapper.vm.validate();

    expect(isVerify).toBeFalsy();
    expect(wrapper.vm.validation.password.error).toBe("поле не заполнено");
  });

  test("для поля нет правила", () => {
    wrapper = shallowMount(Component, {
      propsData: {
        email: "test@example.com",
        password: "password",
      },
    });

    wrapper.vm.validate();
    expect(wrapper.vm.validation.notRules.error).toBe("");
  });
});

describe("Тест миксин $validator - $clearValidationErrors", () => {
  let wrapper;

  const factory = (validation) => {
    const Component = {
      render() {},
      mixins: [validator],
      data() {
        return {
          validation,
        };
      },
      methods: {
        clearErrors() {
          this.$clearValidationErrors(this.validation);
        },
      },
    };

    return shallowMount(Component);
  };

  test("Очищает ошибки", () => {
    // wrapper = shallowMount(Component);
    wrapper = factory({
      email: {
        error: "email error",
      },
      password: {
        error: "password error",
      },
    });
    wrapper.vm.clearErrors();

    expect(wrapper.vm.validation.email.error).toBe("");
    expect(wrapper.vm.validation.password.error).toBe("");
  });

  test("Ничего не делает", () => {
    wrapper = factory();
    wrapper.vm.clearErrors();

    expect(wrapper.vm.validation).toBeUndefined();
  });
});
