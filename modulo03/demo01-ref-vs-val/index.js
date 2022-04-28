const { deepStrictEqual } = require("assert");

//Tipo primitivo gera uma cópia em memória
let counter = 0;
let counter2 = counter;
counter2++;

//tipo de referẽncia, copia o endereço de memória e aponta para o mesmo lugar
const item = { counter: 0 };
const item2 = item;

item2.counter++;
deepStrictEqual(item, { counter: 1 });
item.counter++;
deepStrictEqual(item2, { counter: 1 });
