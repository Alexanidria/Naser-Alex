const express = require("express");

const { db } = require("../../connectToDB");
const router = express().router;
const { validateCar } = require("../../model/items/car-model");

/**-----------------------------------
 * @descrip Get all in a car Table
 * @route /items/car
 * @method get
 * @schemaTable items/car
 * @validte nothing
 * -----------------------------------
 */
router.get("/", (req, res) => {
  db.query("select * from items.fn_car_selectall();", (err, result) => {
    err ? res.send(err) : res.send(result.rows);
  });
});

/**-----------------------------------
 * @descrip Get on car in a car Table
 * @route /items/car/?id
 * @method get
 * @schemaTable items/car
 * @validte nothing
 * -----------------------------------
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM items.fn_car_selectone ($1)", [id], (err, result) =>
    err ? res.send(err) : res.send(result.rows)
  );
});

/**-----------------------------------
 * @descrip create new car in a car Table
 * @route /items/car
 * @method post
 * @schemaTable items/car
 * @validte [name, id_user]
 * -----------------------------------
 */
router.post("/", (req, res, next) => {
  const error = validateCar(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const { nam } = req.body;
  db.query(
    "SELECT * FROM items.fn_car_selectname ($1)", [nam], (err, resulte) =>
    resulte.rows.length ? res.json({ message: "The car name is exites!" }) : next()
  );
});
router.post("/", (req, res) => {
  const { nam, id_user } = req.body;
  db.query("SELECT * from items.fn_car_insert($1,$2)",
    [nam, id_user],
    (err, result) => err ? res.send(err) : res.send(result.rows)
  );
});

/**-----------------------------------
 * @descrip update car in a car Table
 * @route /items/car/?id
 * @method put
 * @schemaTable items/car
 * @validte [nam, id_user]
 * -----------------------------------
 */
router.put("/:id",(req, res, next) => {
  // const error = validateCar(req.body);
  // if (error) return res.status(400).json({ message: error.details[0].message });
  const { nam } = req.body;
  db.query(
    "SELECT * FROM items.fn_car_selectname ($1)", [nam], (err, resulte) =>
    resulte.rows.length ? res.json({ message: "The car name is exites!" }) : next()
  );
});
router.put("/:id", (req, res) => {
  const { nam, id_user } = req.body;
  const { id } = req.params;
  db.query("SELECT * FROM items.fn_car_update($1,$2,$3)", [id, nam, id_user],
    (err, result) => err ? res.send(err) : res.send(result.rows)
  );
});

/**-----------------------------------
 * @descrip delete one car in a car Table
 * @route /items/car/?id
 * @method delete
 * @schemaTable items/car
 * @validte nothing
 * -----------------------------------
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM items.fn_car_delete($1)", [id],
    (err, result) => err ? res.send(err) : res.send(result.rows)
  );
});

module.exports = router;
