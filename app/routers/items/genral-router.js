const router = require("express").Router()

const { db } = require("../../connectToDB");
const { validateGenral } = require("../../model/items/genral-model");

/**-----------------------------------
 * @descrip Get all in a genral Table
 * @route /items/genral
 * @method get
 * @schemaTable items/genral
 * @validte nothing
 * -----------------------------------
 */
router.get("/", (req, res) => {
  db.query("SELECT * FROM items.fn_genral_selectall()", (err, result) =>
    err ? res.send(err) : res.send(result.rows));
});

/**-----------------------------------
 * @descrip Get one in a genral Table
 * @route /items/genral/?id
 * @method get
 * @schemaTable items/genral
 * @validte nothing
 * -----------------------------------
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM items.fn_genral_selectone($1)", [id], (err, result) =>
    err ? res.send(err) : res.send(result.rows));
});

/**-----------------------------------
 * @descrip Create newe one in a genral Table
 * @route /items/genral
 * @method post
 * @schemaTable items/genral
 * @validte [cod, name, id_user]
 * -----------------------------------
 */
router.post("/", (req, res, next) => {
  const error = validateGenral(req.body);
  if (error) return res.status(400).json({ msage: error.details[0].message });
  const { cod } = req.body;
  db.query("SELECT * FROM items.fn_genral_selectcode($1)", [cod], (err, result) =>
    result.rows.length ? res.json({ message: "This code is already exists" }) : next());
});
router.post("/", (req, res) => {
  const { cod, nam, id_user } = req.body;
  db.query("SELECT * FROM items.fn_genral_insert($1,$2,$3)", [cod, nam, id_user],
    (err, result) => err ? res.send(err) : res.send(result.rows));
});

/**-----------------------------------
 * @descrip update one in a genral Table
 * @route /items/genral/?id
 * @method put
 * @schemaTable items/genral
 * @validte [id,cod, name, id_user]
 * -----------------------------------
 */
// router.put("/:id", (req, res, next) => {
//   const error = validateGenral(req.body);
//   if (error) return res.status(400).json({ msage: error.details[0].message });
//   const { cod } = req.body;
//   db.query("SELECT * FROM items.fn_genral_selectcode($1)", [cod], (err, result) =>
//     result.rows.length ? res.json({ message: "This code is already exists" }) : next());
// });
router.put("/:id", (req, res) => {
  const error = validateGenral(req.body);
  if (error) return res.status(400).json({ msage: error.details[0].message });
  const { cod, nam, id_user } = req.body;
  const { id } = req.params;
  db.query("SELECT * FROM items.fn_genral_update($1,$2,$3,$4)", [id, cod, nam, id_user],
    (err, result) => err ? res.send(err) : res.send(result.rows));
});

/**-----------------------------------
 * @descrip delete one in a genral Table
 * @route /items/genral/?id
 * @method delete
 * @schemaTable items/genral
 * @validte nothing
 * -----------------------------------
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM items.fn_genral_delete($1)", [id],
    (err, result) => err ? res.send(err) : res.send(result.rows));
});

module.exports = router;
