const test = require("ava");
const subject = require("./solution");

test.serial("can merge all three JSON files", t => {
  const merged = subject.merged();
  t.is(merged[0].currency_name, "dollar");
});
