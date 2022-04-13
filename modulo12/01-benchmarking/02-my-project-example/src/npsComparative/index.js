import Benchmark from "benchmark";
import npsNew from "./nps-new.js";
import npsOld from "./nps-old.js";
import database from "../../database.js";
const suite = new Benchmark.Suite();

const answers = database.Answers.sort((a, b) =>
  a.created_at > b.created_at ? 1 : -1
);
suite
  .add("NPS#npsOld", function () {
    npsOld(answers);
  })
  .add("NPS#npsNew", function () {
    npsNew(answers);
  })
  .on("cycle", (event) => {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log(`Fastest is ${this.filter("fastest").map("name")}`);
  })
  .run();
