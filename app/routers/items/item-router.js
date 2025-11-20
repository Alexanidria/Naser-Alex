const express = require("express");

const { db } = require("../../connectToDB");
const router = express().router;
const {
  valdeteInsertItem,
  valdeteUpdateItem,
} = require("../../model/items/item-model");

/**-----------------------------------
 * @descrip Get all in a item Table
 * @route /items/item
 * @method get
 * @schemaTable items/item
 * @validte nothing
 * -----------------------------------
 */
router.get("/", (req, res) => {
  db.query("SELECT * FROM items.fn_item_selectall()", (err, result) => 
    err? res.send(err):res.send(result.rows));
});

/**-----------------------------------
 * @descrip Get one by id for a item Table
 * @route /items/item/?id
 * @method get
 * @schemaTable items/item
 * @validte nothing
 * -----------------------------------
 */
router.get("/:id", (req, res) => {
  const { id } = req.body;
  db.query("SELECT * FROM items.fn_item_selectone ($1)", [id], 
    (err, result) => err? res.send(err):res.send(result.rows));
});

/**-----------------------------------
 * @descrip Insert one in a item Table
 * @route /items/item
 * @method post
 * @schemaTable items/item
 * @validte  [num,code_storeSupler,name,rereqost,id_user,id_genral,id_unit, dateadd, id_car]
 * -----------------------------------
 */
router.post("/", (req, res, next) => {
  const error = valdeteInsertItem(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const { num,code_storeSupler } = req.body;
  db.query("SELECT * FROM items.fn_item_selectnumber_supler ($1,$2)", [num,code_storeSupler], (err, result) => 
    result.rows.length ? res.json({ message: "The number of this item is already exites" }): next());
});
router.post("/", (req, res) => {
  const {
    num,
    code_storeSupler,
    name,
    rereqost,
    id_user,
    id_genral,
    id_unit,
    dateadd,
    id_car
  } = req.body;
  db.query(
    "SELECT * FROM Items.fn_Item_Insert($1,$2,$3,$4,$5,$6,$7,$8,$9)",
    [num,code_storeSupler,name,rereqost,id_user,id_genral,id_unit, dateadd, id_car],
    (err, result) => err ? res.send(err) : res.send(result.rows));
});

/**-----------------------------------
 * @descrip update one in a item Table
 * @route /items/item
 * @method put
 * @schemaTable items/item
 * @validte  [id,num,code_storeSupler,name,rereqost,id_user,id_genral,id_unit,datemodif,id_car]
 * -----------------------------------
 */
router.put("/:id", (req, res,next) => {
   const error = valdeteUpdateItem(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const { num,code_storeSupler } = req.body;
  db.query("SELECT * FROM items.fn_item_selectnumber_supler ($1,$2)", [num,code_storeSupler], (err, result) => 
    result.rows.length ? res.json({ message: "The number of this item is already exites" }): next());
});
router.put("/:id", (req, res) => {
  const {
    id, 
    num,
    code_storeSupler,
    name,
    rereqost,
    id_user,
    id_genral,
    id_unit,
    datemodif,
    id_car
  } = req.body;
  db.query(
    "SELECT * FROM Items.fn_Item_Update($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
    [id,num,code_storeSupler,name,rereqost,id_user,id_genral,id_unit,datemodif,id_car],
    (err, result) => err ? res.send(err) : res.send(result.rows));
});
    
/**-----------------------------------
 * @descrip delete one in a item Table
 * @route /items/item
 * @method delete
 * @schemaTable items/item
 * @validte  nothing
 * -----------------------------------
 */
router.delete("/:id", (req, res) => {
  const { id } = req.body;
  db.query("SELECT * FROM items.fn_item_delete($1)", [id], 
     (err, result) => err ? res.send(err) : res.send(result.rows));
});

module.exports = router;
