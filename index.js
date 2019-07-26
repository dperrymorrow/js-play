const abbreviations = require("./data/abbreviations.json");
const capitals = require("./data/capitals.json");
const currencies = require("./data/currencies.json");

const merged = abbreviations.map(abb => {
  const capVal = capitals.filter(cap => {
    return cap.name === abb.name;
  });
  const curVal = currencies.filter(cur => {
    return cur.name === abb.name;
  });
  let output = new Object();
  output.abbreviation = abb.abbreviation;
  output.name = abb.name;
  output.city = capVal[0].city;
  output.currency_name = curVal[0].currency_name;
  return output;
});
//"can merge all JSOn files"
console.log(merged.find(v => v.abbreviation === "AF"));
console.log(merged[0].city);

console.log("merged:", merged);

module.exports = {
  merged: [],

  findWhere() {},
  preMergeSort() {},
  updateWhere() {},

  abbreviations,
  capitals,
  currencies
};
