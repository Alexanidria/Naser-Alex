const express = require("express");

const { db } = require("../../connectToDB");
const router = express().router;
const { validateStoreSupler } = require("../../model/items/storeSupler-model");

/**-----------------------------------
* @descrip Get all in a storeSupler Table
* @route /items/storeSupler
* @method get
* @schemaTable items/storeSupler
* @validte nothing
* -----------------------------------
*/
router.get("/", (req, res) => {
  db.query("SELECT * FROM items.fn_storeSupler_selectall()", (err, result) =>
    err ? res.send(err) : res.send(result.rows));
});

/**-----------------------------------
 * @descrip Get one in a storeSupler Table
 * @route /items/storeSupler/?id
 * @method get
 * @schemaTable items/storeSupler
 * @validte nothing
 * -----------------------------------
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM items.fn_storeSupler_selectone($1)", [id], (err, result) =>
    err ? res.send(err) : res.send(result.rows));
});

/**-----------------------------------
 * @descrip Create newe one in a storeSupler Table
 * @route /items/storeSupler
 * @method post
 * @schemaTable items/storeSupler
 * @validte [cod, name,codStore, id_user]
 * -----------------------------------
 */
router.post("/", (req, res, next) => {
  const error = validateStoreSupler(req.body);
  if (error) return res.status(400).json({ msage: error.details[0].message });
  const { cod } = req.body;
  db.query("SELECT * FROM items.fn_storeSupler_selectcode($1)", [cod], (err, result) =>
    result.rows.length ? res.json({ message: "This code is already exists" }) : next());
});
router.post("/", (req, res) => {
  const { cod, name, codStore, id_user } = req.body;
  db.query("SELECT * FROM items.fn_storeSupler_insert($1,$2,$3,$4)", [cod, name, codStore, id_user],
    (err, result) => err ? res.send(err) : res.send(result.rows));
});

/**-----------------------------------
 * @descrip update one in a genral Table
 * @route /items/storeSupler/?id
 * @method put
 * @schemaTable items/storeSupler
 * @validte [id, cod, name,codStore, id_user]
 * -----------------------------------
 */
router.put("/:id", (req, res, next) => {
  const error = validateStoreSupler(req.body);
  if (error) return res.status(400).json({ msage: error.details[0].message });
  const { cod } = req.body;
  db.query("SELECT * FROM items.fn_storeSupler_selectcode($1)", [cod], (err, result) =>
    result.rows.length ? res.json({ message: "This code is already exists" }) : next());
});
router.put("/:id", (req, res) => {
  const { cod, name, codStore, id_user } = req.body;
  const { id } = req.params
  db.query("SELECT * FROM items.fn_storeSupler_update($1,$2,$3,$4,$5)", [id, cod, name, codStore, id_user],
    (err, result) => err ? res.send(err) : res.send(result.rows));
});

/**-----------------------------------
 * @descrip delete one in a storeSupler Table
 * @route /items/storeSupler/?id
 * @method delete
 * @schemaTable items/storeSupler
 * @validte nothing
 * -----------------------------------
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM items.fn_storeSupler_delete($1)", [id],
    (err, result) => err ? res.send(err) : res.send(result.rows));
});

module.exports = router;
