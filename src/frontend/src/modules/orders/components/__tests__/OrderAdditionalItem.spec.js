import { enableAutoDestroy, shallowMount } from "@vue/test-utils";
import OrderAdditionalItem from "../OrderAdditionalItem";

jest.mock("../../../../common/utils/helpers/common", () => ({
  getStringProductPrice: () => "100",
}));

enableAutoDestroy(afterEach);

const mockProduct = {
  image: "image.jpg",
  name: "Product",
};

const factory = () => {
  return shallowMount(OrderAdditionalItem, {
    propsData: { product: mockProduct },
  });
};

describe("Компонент OrderAdditionalItem", () => {
  let wrapper;

  test("Правильно отрисовывает имя", () => {
    wrapper = factory();

    expect(wrapper.html()).toContain("<span>Product</span>");
  });

  test("Правильно отрисовывает цену", () => {
    wrapper = factory();

    expect(wrapper.text()).toContain("100 ₽");
  });
});
