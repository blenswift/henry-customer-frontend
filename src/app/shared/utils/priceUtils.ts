import { ProductCart } from './../models/product-cart';
export const priceOfProduct = (item: ProductCart): number => {
  let price = 0;

  let singleItemPrice = 0;
  singleItemPrice = item.product.basePrice;
  item.product.extraGroups.forEach(extraGroup => {
    if (extraGroup.selectionType === 'RADIO_GROUP') {
      const selected = extraGroup.extras.filter(x => x.id === extraGroup.selected)[0];
      singleItemPrice += selected?.price ?? 0;
    } else if (extraGroup.selectionType === 'CHECKBOX') {
      extraGroup.extras.forEach(extra => {
        if (extra.selected) {
          singleItemPrice += extra.price ?? 0;
        }
      });
    } else if (extraGroup.selectionType === 'MULTI_SELECT') {
      extraGroup.extras.forEach(extra => {
        if (extra.quantity > 0) {
          singleItemPrice += (extra.price ?? 0) * extra.quantity;
        }
      });
    }
  });

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
