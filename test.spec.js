const test = require("ava");
const subject = require("./index");

// merging

test("can merge all three JSON files", t => {
  // t.log(subject.merged[0]);
  t.is(subject.merged[0].city, "Bamako");
  t.true(Array.isArray(subject.merged));

  const item = subject.merged.find(v => v.abbreviation === "AF");
  t.truthy(item);
  t.is(item.city, "Kabul");
  t.is(item.currency_name, "Afghanistan Afghani");
  t.is(item.abbreviation, "AF");
});

test("merge does not affect original JSON files", t => {
  t.is(subject.abbreviations[0].city, undefined);
  t.is(subject.capitals[0].currency_name, undefined);
  t.is(subject.currencies[0].city, undefined);
});

test("merge does not include items without a name", t => {
  t.falsy(subject.merged.find(v => !v.name));
});

// sorting

test("can sort defaulting to name", t => {
  const sorted = subject.sort();
  // t.log(sorted[0]);
  t.is(sorted[0].name, "Afghanistan");
  t.is(sorted[45].name, "Cocos (Keeling) Islands");
  t.is(sorted[sorted.length - 1].name, "North Macedonia");
});

test("sort can sort on fields and directional", t => {
  const sorted = subject.sort("city", "desc");
  // t.log(sorted[0]);
  t.is(sorted[0].city, "Zagreb");
  t.is(sorted[35].city, "Riga");
  t.is(sorted[sorted.length - 1].city, "");
});

// finding

test("can query by key / values", t => {
  // t.log(subject.findWhere({ city: "" }));
  t.is(subject.findWhere({ city: "" }).length, 4);
  const riga = subject.findWhere({ city: "Riga" })[0];
  // t.log("riga", riga);
  t.truthy(riga);
  t.is(riga.name, "Latvia");
});

test("can query multiple items", t => {
  // t.log(subject.findWhere({ city: "", currency_name: "" }));
  t.is(subject.findWhere({ city: "", currency_name: "" }).length, 1);
  t.is(subject.findWhere({ city: "Barbados", name: "Guam" }).length, 0);
  t.is(
    subject.findWhere({
      abbreviation: "TF",
      city: "",
      currency_name: "Euro",
      name: "French Southern territories"
    }).length,
    1
  );
});

test("returns empty array on invalid query", t => {
  t.is(subject.findWhere("foo").length, 0);
  t.is(subject.findWhere().length, 0);
  t.is(subject.findWhere(null).length, 0);
  t.is(subject.findWhere(true).length, 0);
});

// updating

test("can update by values", t => {
  subject.updateWhere({ city: "" }, { city: "N/A" });
  t.is(subject.findWhere({ city: "N/A" }).length, 4);

  subject.updateWhere({ city: null }, { city: "N/A" });
  t.is(subject.findWhere({ city: "N/A" }).length, 5);

  subject.updateWhere(
    { currency_name: "Euro", city: "Dublin" },
    { currency_name: "foo" }
  );
  t.is(subject.findWhere({ currency_name: "foo" }).length, 1);
});

test("update does not update the originals", t => {
  subject.updateWhere({ name: "Antarctica" }, { city: "South Pole" });
  t.is(subject.findWhere({ name: "Antarctica" })[0].city, "South Pole");

  subject.capitals.forEach(country => {
    if (country.name === "Antarctica") t.is(country.city, null);
  });
});
