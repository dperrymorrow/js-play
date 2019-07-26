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

// sort
function mergedSort(key = "name", order = "asc", arr = merged) {
  return arr.sort((a, b) => {
    if (!a[key]) return +1;
    let comparison = a[key].localeCompare(b[key]);
    return order === "desc" ? comparison * -1 : comparison;
  });
}

// findWhere
function findWhere(obj) {
  console.log(typeof(obj) !== 'object')
  if(typeof(obj) !== 'object') {
    console.log("fail");
    return [];
  }
  const keys = Object.keys(obj);
  const returnVal = merged.filter(el => {
    switch (keys.length) {
      case 1:
        return el[keys[0]] === obj[keys[0]];
      case 2:
        return el[keys[0]] === obj[keys[0]] && el[keys[1]] === obj[keys[1]];
      case 3:
        return (
          el[keys[0]] === obj[keys[0]] &&
          el[keys[1]] === obj[keys[1]] &&
          el[keys[2]] === obj[keys[2]]
        );
      case 4:
        return (
          el[keys[0]] === obj[keys[0]] &&
          el[keys[1]] === obj[keys[1]] &&
          el[keys[2]] === obj[keys[2]] &&
          el[keys[3]] === obj[keys[3]]
        );
      default:
        return [];
    }
  });
  return returnVal;
}

findWhere("foo");
module.exports = {
  merged,

  findWhere,
  mergedSort,
  updateWhere() {},

  abbreviations,
  capitals,
  currencies
};
