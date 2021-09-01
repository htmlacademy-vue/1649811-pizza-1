export default {
  price: ({ items }) => {
    return items.reduce((acc, item) => acc + item.price * item.count, 0);
  },
  getItems: ({ items }) => {
    return items;
  },
};
