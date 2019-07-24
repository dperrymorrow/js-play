const test = require("ava");
const subject = require("./index");

// merging

test("can merge all three JSON files", t => {
  t.log(subject.merged[0]);
  t.is(subject.merged[0].city, "Bamako");
});

test("merge does not affect original JSON files", t => {
  t.is(subject.abbreviations[0].city, undefined);
  t.is(subject.capitals[0].currency_name, undefined);
  t.is(subject.currencies[0].city, undefined);
});

// sorting

test("can sort defaulting to name", t => {
  t.log(subject.sort()[0]);
  t.is(subject.sort()[0].name, "Afghanistan");
});

test("sort can sort on fields and directional", t => {
  t.log(subject.sort("city", "desc")[0]);
  t.is(subject.sort("city", "desc")[0].city, "al-Manama");
});

// finding

test("can query by key / values", t => {
  t.log(subject.findWhere({ city: "" }));
  t.is(subject.findWhere({ city: "" }).length, 5);
});

test("can query multiple items", t => {
  t.log(subject.findWhere({ city: "", currency_name: "" }));
  t.is(subject.findWhere({ city: "", currency_name: "" }).length, 1);
});

// updating

test("can update by values", t => {
  subject.updateWhere({ city: "" }, { city: "N/A" });
  t.is(subject.findWhere({ city: "N/A" }).length, 5);
});

test("update does not update the originals", t => {
  subject.updateWhere({ name: "Antarctica" }, { city: "South Pole" });
  t.is(subject.findWhere({ name: "Antarctica" })[0].city, "South Pole");

  subject.capitals.forEach(country => {
    if (country.name === "Antarctica") t.is(country.city, "");
  });
});
