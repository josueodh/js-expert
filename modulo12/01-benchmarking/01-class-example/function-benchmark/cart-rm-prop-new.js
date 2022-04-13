import Product from "../src/eentities/product.js";

export default class Cart {
  constructor({ products }) {
    this.products = this.removeUndefinedProps(products);
  }
  removeUndefinedProps(products) {
    const result = [];

    for (const product of products) {
      const keys = Reflect.ownKeys(product);
      if (!keys.length) continue;

      // 1°
      //  return JSON.parse(JSON.stringify(product));

      //2°
      /*
      keys.forEach(
        (key) => product[key] || Reflect.deleteProperty(product, key)
      );
      result.push(new Product(product));
      */

      // 3°
      let newObject = {};

      keys.forEach((key) => (key) => {
        if (!keys[key]) return;

        newObject[key] = keys[key];
      });

      result.push(new Product(product));
    }

    return result;
  }
}
