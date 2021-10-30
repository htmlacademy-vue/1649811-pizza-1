import {
  createLocalVue,
  enableAutoDestroy,
  shallowMount,
} from "@vue/test-utils";
import Vuex from "vuex";
import Profile from "../Profile";

enableAutoDestroy(afterEach);

const mockUser = {
  name: "User",
  phone: "222-333",
  avatar: "avatar.jpg",
};
const mockAddresses = [
  { id: 1, street: "Street 1", building: "1", flat: "1" },
  { id: 2, street: "Street 2", building: "2", flat: "" },
];

let loadUserAddresses;

const localVue = createLocalVue();
localVue.use(Vuex);

const factory = (addresses = []) => {
  loadUserAddresses = jest.fn();

  const store = new Vuex.Store({
    modules: {
      auth: {
        namespaced: true,
        getters: {
          getUser: () => mockUser,
          getUserAddresses: () => addresses,
        },
        actions: {
          loadUserAddresses,
        },
      },
    },
  });

  return shallowMount(Profile, { localVue, store });
};

describe("view Profile", () => {
  let wrapper;

  test("Отрисовывает", () => {
    wrapper = factory();
    expect(wrapper.text()).toContain("Добавить новый адрес");
  });

  test("Показывает имя", () => {
    wrapper = factory();
    expect(wrapper.find(".user__name").text()).toBe("User");
  });

  test("Показывает телефон", () => {
    wrapper = factory();
    expect(wrapper.find("p.user__phone").text()).toBe(
      "Контактный телефон: 222-333"
    );
  });

  test("Показывает 2 адреса", () => {
    wrapper = factory(mockAddresses);
    expect(wrapper.findAll("div.sheet.address-form").length).toBe(2);
  });
});

describe("view Profile, метод addressToString", () => {
  let wrapper;

  test("Должен вернуть 'Street 1, д. 1, оф. 1'", () => {
    wrapper = factory();
    const addressStr = wrapper.vm.addressToString(mockAddresses[0]);

    expect(addressStr).toBe("Street 1, д. 1, оф. 1");
  });

  test("Должен вернуть 'Street 2, д. 2'", () => {
    wrapper = factory();
    const addressStr = wrapper.vm.addressToString(mockAddresses[1]);

    expect(addressStr).toBe("Street 2, д. 2");
  });
});

describe("view Profile, метод setEditedAddress", () => {
  let wrapper;

  test("Вызывает setEditedAddress", async () => {
    wrapper = factory(mockAddresses);
    const spy = jest.spyOn(wrapper.vm, "setEditedAddress");
    const button = wrapper.find("div.address-form__edit button.icon");
    await button.trigger("click");

    expect(spy).toHaveBeenCalledWith(mockAddresses[0]);
  });

  test("Устанавливает editedAddressId 2", () => {
    wrapper = factory();
    wrapper.vm.setEditedAddress(mockAddresses[1]);
    expect(wrapper.vm.editedAddressId).toBe(2);
  });
});

describe("view Profile, метод closeForm", () => {
  let wrapper;

  test("Устанавливает editedAddressId null", async () => {
    wrapper = factory();
    await wrapper.vm.closeForm();

    expect(wrapper.vm.editedAddressId).toBeNull();
  });

  test("Устанавливает setEditedAddress", async () => {
    wrapper = factory();
    await wrapper.vm.closeForm();

    expect(loadUserAddresses).toHaveBeenCalled();
  });
});
