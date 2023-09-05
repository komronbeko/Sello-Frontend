
export function handleTotal(filteredCarts, setUpdateCart) {
  let count = 0;
  let price = 0;
  let discount = 0;
  let total = 0;

  setUpdateCart(false);

  for (let i = 0; i < filteredCarts.length; i++) {
    count += filteredCarts[i].count;
    price += +filteredCarts[i].product.price * filteredCarts[i].count;
    if (filteredCarts[i].product.discount?.rate) {
      discount +=
        (+filteredCarts[i].product.price *
          filteredCarts[i].count *
          filteredCarts[i].product.discount?.rate) /
        100;
    }
  }

  total = price - discount;

  return { count, price, discount, total };
}
