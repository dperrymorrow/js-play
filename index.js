const abbreviations = require("./data/abbreviations.json");
const capitals = require("./data/capitals.json");
const currencies = require("./data/currencies.json");

module.exports = {
  merged() {
    return abbreviations;
  },

  abbreviations,
  capitals,
  currencies
};
