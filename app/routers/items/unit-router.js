const express = require("express");

const { db } = require("../../connectToDB");
const router = express().router;
const { validateUnit } = require("../../model/items/unit-model");

/**-----------------------------------
 * @descrip Get all in a unit Table
 * @route /items/unit
 * @method get
 * @schemaTable items/unit
 * @validte nothing
 * -----------------------------------
 */
router.get("/", (req, res) => {
  db.query("SELECT * FROM items.fn_unit_selectall()",
    (err, result) => err ? res.send(err) : res.send(result.rows));
});

/**-----------------------------------
 * @descrip Get on unit in a unit Table
 * @route /items/unit/?id
 * @method get
 * @schemaTable items/unit
 * @validte nothing
 * -----------------------------------
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM items.fn_unit_selectone ($1)", [id],
    (err, result) => err ? res.send(err) : res.send(result.rows));
});

/**-----------------------------------
 * @descrip create new in a unit Table
 * @route /items/unit
 * @method post
 * @schemaTable items/unit
 * @validte [cod, name, id_user]
 * -----------------------------------
 */
router.post("/", (req, res, next) => {
  const error = validateUnit(req.body);
  if (error) return res.status(400).json({ msage: error.details[0].message });
  const { cod } = req.body
  db.query("SELECT * FROM items.fn_unit_selectcode($1)", [cod], (err, result) =>
    result.rows.length ? res.json({ message: "This code is already exists" }) : next());
});
router.post("/", (req, res) => {
  const { cod, name, id_user } = req.body;
  db.query(
    "SELECT * FROM items.fn_unit_insert($1,$2,$3)",
    [cod, name, id_user],
    (err, result) => err ? res.send(err) : res.send(result.rows));
});

/**-----------------------------------
 * @descrip update one in a unit Table
 * @route /items/unit/?id
 * @method put
 * @schemaTable items/unit
 * @validte [id,cod, name, id_user]
 * -----------------------------------
 */
router.put("/:id", (req, res, next) => {
  const error = validateUnit(req.body);
  if (error) return res.status(400).json({ msage: error.details[0].message });
  const { cod } = req.body
  db.query("SELECT * FROM items.fn_unit_selectcode($1)", [cod], (err, result) =>
    result.rows.length ? res.json({ message: "This code is already exists" }) : next());
});
router.put("/:id", (req, res) => {
  const { cod, name, id_user } = req.body;
  const { id } = req.params;
  db.query("SELECT * FROM items.fn_unit_update($1,$2,$3,$4)", [id, cod, name, id_user],
    (err, result) => err ? res.send(err) : res.send(result.rows));
});

/**-----------------------------------
 * @descrip delete one in a unit Table
 * @route /items/unit/?id
 * @method delete
 * @schemaTable items/unit
 * @validte nothing
 * -----------------------------------
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM items.fn_unit_delete($1)", [id],
    (err, result) => err ? res.send(err) : res.send(result.rows));
});

module.exports = router;
