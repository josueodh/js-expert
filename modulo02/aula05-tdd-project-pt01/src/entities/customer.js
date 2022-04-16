const Base = require("./base/base");

class Car extends Base {
  constructor({ id, name, age }) {
    super({ id, name });
    this.age = age;
  }
}

module.exports = Car;
