const express = require("express");

const { db } = require("../../connectToDB");
const router = express().router;
const { validateTranMoveHeder } = require("../../model/stored/tranMoveHeder-model");

/**-----------------------------------
 * @descrip Get all in a tranMoveHeder Table
 * @route /stored/tranMoveHeder
 * @method get
 * @schemaTable stored/tranMoveHeder
 * @validte nothing
 * -----------------------------------
 */
router.get("/", (req, res) => {
  db.query("SELECT * FROM stored.fn_tranMoveHeder_selectall()", (err, result) =>
    err ? res.send(err) : res.send(result.rows));
});

/**-----------------------------------
 * @descrip Get one in a tranMoveHeder Table
 * @route /stored/tranMoveHeder/?id
 * @method get
 * @schemaTable stored/tranMoveHeder
 * @validte nothing
 * -----------------------------------
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM stored.fn_tranMoveHeder_selectone($1)", [id], (err, result) =>
    err ? res.send(err) : res.send(result.rows));
});

/**-----------------------------------
 * @descrip Create newe one in a tranMoveHeder Table
 * @route /stored/tranMoveHeder
 * @method post
 * @schemaTable stored/tranMoveHeder
 * @validte [id_heder,id_item, cont, prise, nots]
 * -----------------------------------
 */
router.post("/", (req, res, next) => {
  const error = validateTranMoveHeder(req.params, req.body);
  if (error) return res.status(400).json({ msage: error.details[0].message });
  const { num_docom, cod_store, cod_kindoc } = req.body;
  db.query("SELECT * FROM stored.fn_TranMovHeder_selectforone($1,$2,$3)",
    [num_docom, cod_store, cod_kindoc], (err, result) =>
    result.rows.length ? res.json({ message: "This code is already exists" }) : next());
});
router.post("/", (req, res) => {
  const { num_docom, cod_store, dat, cod_kindoc, id_user, account_finnn, jop } = req.body;
  db.query("SELECT * FROM stored.fn_tranMoveHeder_insert($1,$2,$3,$4,$5)",
    [num_docom, cod_store, dat, cod_kindoc, id_user, account_finnn, jop],
    (err, result) => err ? res.send(err) : res.send(result.rows));
});

/**-----------------------------------
 * @descrip update one in a tranMoveHeder Table
 * @route /stored/tranMoveHeder/?id
 * @method put
 * @schemaTable stored/tranMoveHeder
 * @validte [id,cod, name, id_user]
 * -----------------------------------
 */
// router.put("/:id", (req, res, next) => {
//   const error = validateTranMoveHeder(req.params, req.body);
//   if (error) return res.status(400).json({ msage: error.details[0].message });
//   const { num_docom, cod_store, cod_kindoc } = req.body;
//   db.query("SELECT * FROM stored.fn_TranMovHeder_selectforone($1,$2,$3)",
//     [num_docom, cod_store, cod_kindoc], (err, result) =>
//     result.rows.length ? res.json({ message: "This code is already exists" }) : next());
// });
router.put("/:id", (req, res) => {
  const error = validateTranMoveHeder(req.body);
  if (error) return res.status(400).json({ msage: error.details[0].message });
  const { num_docom, cod_store, dat, cod_kindoc, id_user, account_finnn, jop } = req.body;
  const { id } = req.params;
  db.query("SELECT * FROM stored.fn_tranMoveHeder_update($1,$2,$3,$4,$5,$6,$7,$8)",
    [id, num_docom, cod_store, dat, cod_kindoc, id_user, account_finnn, jop],
    (err, result) => err ? res.send(err) : res.send(result.rows));
});

/**-----------------------------------
 * @descrip delete one in a tranMoveHeder Table
 * @route /stored/tranMoveHeder/?id
 * @method delete
 * @schemaTable stored/tranMoveHeder
 * @validte nothing
 * -----------------------------------
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM stored.fn_tranMoveHeder_delete($1)", [id],
    (err, result) => err ? res.send(err) : res.send(result.rows));
});

module.exports = router;
