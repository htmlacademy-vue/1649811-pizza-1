import { mount, shallowMount } from "@vue/test-utils";

export const createComponent = (component, options) => {
  return mount(component, options);
};

export const createShallowComponent = (component, options) => {
  return shallowMount(component, options);
};
