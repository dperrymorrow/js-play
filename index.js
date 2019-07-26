const abbreviations = require("./data/abbreviations.json");
const capitals = require("./data/capitals.json");
const currencies = require("./data/currencies.json");

// merge
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
//"can merge all JSON files"
console.log(merged.find(v => v.abbreviation === "AF"));
console.log(merged[0].city);

// sort
function mergedSort(key = "name", order = "asc", arr = merged) {
  return arr.sort((a, b) => {
    if (!a[key]) return +1;
    let comparison = a[key].localeCompare(b[key]);
    console.log(true);
    return order === "desc" ? comparison * -1 : comparison;
  });
}

// console.log(merged.sort(mergedSort("city", "desc")));
// console.log("merged:", merged);

module.exports = {
  merged,

  findWhere() {},
  mergedSort,
  updateWhere() {},

  abbreviations,
  capitals,
  currencies
};
