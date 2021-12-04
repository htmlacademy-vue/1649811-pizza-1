import {enableAutoDestroy, shallowMount} from "@vue/test-utils";
import Index from "../Index";

enableAutoDestroy(afterEach);

const factory = () => {
  const stubs = ["router-view"];
  return shallowMount(Index, {stubs});
};

describe("view Index", () => {
  let wrapper;

  test("Отрисовывает", () => {
    wrapper = factory();
    expect(wrapper.find("h1").text()).toBe('Конструктор пиццы')
  });
});
