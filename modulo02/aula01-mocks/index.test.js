const { error } = require("./src/constantes.js");

const { rejects, deepStrictEqual } = require("assert");
const File = require("./src/file.js");
(async () => {
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/fourItems-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/invalid-header.csv";
    const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/threeItems-valid.csv";
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        name: "Erick Wendel",
        id: 123,
        profession: "Javascript Instructor",
        birthDay: 1997,
      },
      {
        name: "Xuxa da Silva",
        id: 321,
        profession: "Javascript Specialist",
        birthDay: 1942,
      },
      {
        name: "Joaozinho",
        id: 231,
        profession: "Java Developer",
        birthDay: 1992,
      },
    ];
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
