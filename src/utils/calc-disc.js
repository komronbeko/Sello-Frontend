export default function calcDisc(original_price, disc_rate) {
  let final_price = original_price;
  if (disc_rate) {
    final_price = original_price - (original_price * disc_rate) / 100;
  }

  return final_price.toFixed(2);
}
