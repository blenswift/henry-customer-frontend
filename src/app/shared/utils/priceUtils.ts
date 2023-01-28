import { ProductCart } from './../models/product-cart';
export const priceOfProduct = (item: ProductCart): number => {
  let price = 0;

  let singleItemPrice = 0;
  singleItemPrice = item.product.basePrice;
  item.product.extraGroups.forEach(extraGroup => {
    console.log(extraGroup.extras);
    extraGroup.extras.forEach(extra => {
      if (extra.selected) {
        singleItemPrice += extra.price ?? 0;
      }
    });
  });
  singleItemPrice *= item.quantity;
  price += singleItemPrice;

  return price;
};

export const priceOfProducts = (items: ProductCart[]): number => {
  let price = 0;

  items.forEach(item => {
    let singleItemPrice = priceOfProduct(item);
    singleItemPrice *= item.quantity;
    price += singleItemPrice;
  });

  return price;
};
