import Product from "./product.js";
import { randomUUID as uuid } from "crypto";

export default class Cart {
  constructor({ at, products }) {
    this.id = uuid();
    this.at = at;
    this.products = this.removeUndefinedProps(products);
    this.total = this.getCartPrice();
  }
  removeUndefinedProps(products) {
    const result = [];

    for (const product of products) {
      const keys = Reflect.ownKeys(product);
      if (!keys.length) continue;

      keys.forEach(
        (key) => product[key] || Reflect.deleteProperty(product, key)
      );
      result.push(new Product(product));
    }

    return result;
  }

  getCartPrice() {
    let price = 0;

    for (const product of this.products) {
      price += product.price;
    }

    return price;
  }
}
