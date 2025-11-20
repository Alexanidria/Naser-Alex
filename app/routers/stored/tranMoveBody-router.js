const express = require("express");

const { db } = require("../../connectToDB");
const router = express().router;
const { validateTranMoveBody } = require("../../model/stored/tranMoveBody-model");

/**-----------------------------------
 * @descrip Get all in a tranMoveBody Table
 * @route /stored/tranMoveBody
 * @method get
 * @schemaTable stored/tranMoveBody
 * @validte nothing
 * -----------------------------------
 */
router.get("/", (req, res) => {
  db.query("SELECT * FROM stored.fn_tranMoveBody_selectall()", (err, result) =>
    err ? res.send(err) : res.send(result.rows));
});

/**-----------------------------------
 * @descrip Get one in a tranMoveBody Table
 * @route /stored/tranMoveBody/?id
 * @method get
 * @schemaTable stored/tranMoveBody
 * @validte nothing
 * -----------------------------------
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM stored.fn_tranMoveBody_selectone($1)", [id], (err, result) =>
    err ? res.send(err) : res.send(result.rows));
});

/**-----------------------------------
 * @descrip Create newe one in a tranMoveBody Table
 * @route /stored/tranMoveBody/:id_heder
 * @method post
 * @schemaTable stored/tranMoveBody
 * @validte [id_heder,id_item, cont, prise, nots]
 * -----------------------------------
 */
router.post("/:id_heder", (req, res, next) => {
  const error = validateTranMoveBody(req.params, req.body);
  if (error) return res.status(400).json({ msage: error.details[0].message });
  const { id_heder } = req.params;
  db.query("SELECT * FROM stored.fn_TranMovHeder_selectone($1)", [id_heder], (err, result) =>
    !result.rows.length ? res.json({ message: "This code is not exists" }) : next());
});
router.post("/:id_heder", (req, res) => {
  const { id_item, cont, prise, nots } = req.body;
  const { id_heder } = req.params;
  db.query("SELECT * FROM stored.fn_tranMoveBody_insert($1,$2,$3,$4,$5)",
    [id_heder, id_item, cont, prise, nots],
    (err, result) => err ? res.send(err) : res.send(result.rows));
});

/**-----------------------------------
 * @descrip update one in a tranMoveBody Table
 * @route /stored/tranMoveBody/?id
 * @method put
 * @schemaTable stored/tranMoveBody
 * @validte [id,cod, name, id_user]
 * -----------------------------------
 */
router.put("/:id", (req, res) => {
  const error = validateTranMoveBody(req.body);
  if (error) return res.status(400).json({ msage: error.details[0].message });
  const { id_item, cont, prise, nots } = req.body;
  const { id } = req.params;
  db.query("SELECT * FROM stored.fn_tranMoveBody_update($1,$2,$3,$4,$5)",
    [id, id_item, cont, prise, nots],
    (err, result) => err ? res.send(err) : res.send(result.rows));
});

/**-----------------------------------
 * @descrip delete one in a tranMoveBody Table
 * @route /stored/tranMoveBody/?id
 * @method delete
 * @schemaTable stored/tranMoveBody
 * @validte nothing
 * -----------------------------------
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM stored.fn_tranMoveBody_delete($1)", [id],
    (err, result) => err ? res.send(err) : res.send(result.rows));
});

module.exports = router;
