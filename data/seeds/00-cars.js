exports.seed = function (knex, Promise) {
  return knex("cars")
    .del()
    .then(function () {
      return knex("cars").insert([
        {
          vin: "11111111111111111",
          make: "Make1",
          model: "Model1",
          mileage: 5000,
          title: "Title1",
        },
        {
          vin: "11111111111111112",
          make: "Make2",
          model: "Model2",
          mileage: 5001,
          title: "Title2",
        },
        {
          vin: "11111111111111113",
          make: "Make3",
          model: "Model3",
          mileage: 5002,
          title: "Title3",
        },
      ]);
    });
};

// knex migrate:rollback
// knex migrate:latest
// knex migrate:run
