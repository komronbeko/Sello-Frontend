
export function handleTotal(carts) {
  let count = 0;
  let price = 0;
  let discount = 0;
  let total = 0;

  for (let i = 0; i < carts.length; i++) {
    count += carts[i].count;
    price += +carts[i].product.price * carts[i].count;
    if (carts[i].product.discount?.rate) {
      discount +=
        (+carts[i].product.price *
          carts[i].count *
          carts[i].product.discount?.rate) /
        100;
    }
  }

  total = price - discount;

  return { count, price, discount, total };
}
