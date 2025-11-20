const express = require("express");

const { db } = require("../../connectToDB");
const router = express().router;
const { validateStore } = require("../../model/stored/store-model");

/**-----------------------------------
 * @descrip Get all in a store Table
 * @route /stored/store
 * @method get
 * @schemaTable stored/store
 * @validte nothing
 * -----------------------------------
 */
router.get("/", (req, res) => {
  db.query("SELECT * FROM stored.fn_store_selectall()", (err, result) =>
    err ? res.send(err) : res.send(result.rows));
});

/**-----------------------------------
 * @descrip Get one in a store Table
 * @route /stored/store/?id
 * @method get
 * @schemaTable stored/store
 * @validte nothing
 * -----------------------------------
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM stored.fn_store_selectone($1)", [id], (err, result) =>
    err ? res.send(err) : res.send(result.rows));
});

/**-----------------------------------
 * @descrip Create newe one in a store Table
 * @route /stored/store
 * @method post
 * @schemaTable stored/store
 * @validte [cod, name, id_user]
 * -----------------------------------
 */
router.post("/", (req, res, next) => {
  const error = validateStore(req.body);
  if (error) return res.status(400).json({ msage: error.details[0].message });
  const { cod } = req.body;
  db.query("SELECT * FROM stored.fn_store_selectcod($1)", [cod], (err, result) =>
    result.rows.length ? res.json({ message: "This code is already exists" }) : next());
});
router.post("/", (req, res) => {
  const { cod, nam, id_user } = req.body;
  db.query("SELECT * FROM stored.fn_store_insert($1,$2,$3)", [cod, nam, id_user],
    (err, result) => err ? res.send(err) : res.send(result.rows));
});

/**-----------------------------------
 * @descrip update one in a store Table
 * @route /stored/store/?id
 * @method put
 * @schemaTable stored/store
 * @validte [id,cod, name, id_user]
 * -----------------------------------
 */
router.put("/:id", (req, res, next) => {
  const error = validateStore(req.body);
  if (error) return res.status(400).json({ msage: error.details[0].message });
  const { cod } = req.body;
  db.query("SELECT * FROM stored.fn_store_selectcod($1)", [cod], (err, result) =>
    result.rows.length ? res.json({ message: "This code is already exists" }) : next());
});
router.put("/:id", (req, res) => {
  const error = validateStore(req.body);
  if (error) return res.status(400).json({ msage: error.details[0].message });
  const { cod, name, id_user } = req.body;
  const { id } = req.params;
  db.query("SELECT * FROM stored.fn_store_update($1,$2,$3,$4)", [id, cod, name, id_user],
    (err, result) => err ? res.send(err) : res.send(result.rows));
});

/**-----------------------------------
 * @descrip delete one in a store Table
 * @route /stored/store/?id
 * @method delete
 * @schemaTable stored/store
 * @validte nothing
 * -----------------------------------
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM stored.fn_store_delete($1)", [id],
    (err, result) => err ? res.send(err) : res.send(result.rows));
});

module.exports = router;
