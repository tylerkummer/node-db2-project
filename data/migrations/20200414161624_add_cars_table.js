exports.up = function (knex) {
  return knex.schema.createTable("cars", (tbl) => {
    // ID
    tbl.increments("id");
    // VIN
    tbl.string("vin").notNullable().unique();
    // Make
    tbl.string("make").notNullable();
    // Model
    tbl.string("model").notNullable();
    // Mileage
    tbl.integer("mileage").notNullable();
    // Title
    tbl.string("title");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars");
};
