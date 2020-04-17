const express = require("express");
const knex = require("knex");

const knexfile = require("../knexfile");

const db = knex(knexfile.development);

const router = express.Router();

router.get("/", (req, res) => {
  db.select("*")
    .from("cars")
    .then((car) => {
      res.status(200).json({ data: car });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.get("/:id", (req, res) => {
  db("cars")
    .where({ id: req.params.id })
    .first()
    .then((car) => {
      res.status(200).json({ data: car });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.post("/", (req, res) => {
  const carData = req.body;
  db("cars")
    .insert(carData, "id")
    .then((car) => {
      const id = car[0];
      db("cars")
        .where({ id })
        .first()
        .then((car) => {
          res.status(201).json({ data: car });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.patch("/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  db("cars")
    .where({ id })
    .update(changes)
    .then((count) => {
      if (count > 0) {
        res.status(201).json({ message: "update successful" });
      } else {
        res.status(404).json({ message: "no posts by that id found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("cars")
    .del()
    .where({ id })
    .then((carDeleted) => {
      res.status(200).json({ data: carDeleted });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
