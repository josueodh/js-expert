99999999999; //16
100000000000;

true + 2;
// 3
"21" + true;
//'21true

"21" - true;
//20

3 > 2;
//true
2 > 1;
//true
3 > 2 > 1;
//false

3 > 2 >= 1;
//true

"B" + "a" + +"a" + "a";
//banana

"1" == 1;
//true
"1" === 1;

//

console.assert(String(123) === "123", "explicit convertion to string");
console.assert(123 + "" === "123", "implicit convertion to string");

console.assert(("hello" || 123) === "hello", "|| returns the first element!");
console.assert(("hello" && 123) === 123, "&& returns the last element!");

// ------------------------

const item = {
  name: "Josué",
  age: 23,
  //string:  1 se não for primitivo, chama o valueof
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
  //number: 1 se não for primitivo, chama o toString
  valueOf() {
    return { hey: "dude" };
    //return 007;
  },

  //ele tem prioridade na parada
  [Symbol.toPrimitive](coercionTyoe) {
    console.log("trying to convert to", coercionTyoe);
    const types = {
      string: JSON.stringify(this),
      number: "0007",
    };

    return types[coercionTyoe] || types.string;
  },
};

//console.log("toString", String(item));
// vai retornar NaN pois o toString retornou a string
//console.log("valueOf", Number(item));
//chama a conversão default
//console.log("Date", new Date(item));

console.assert(item + 0 === '{"name":"Josué","age":23}0');
//console.log("!!item is true", !!item)

console.assert(!!item);

console.assert("Ae".concat(item) === 'Ae{"name":"Josué","age":23}');

console.assert(item == String(item));

const item2 = { ...item, name: "Zézin", age: 20 };
//console.log("New Object", item2);

console.assert(item2.name === "Zézin" && item2.age === 20);
