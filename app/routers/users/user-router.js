const router = require("express").Router();

const db = require("../../connectToDB");
const { validateUser } = require("../../model/users/user-model");

/**
 * @description Get all a user  table
 * @route /users/user
 * @method get
 * @schemaTable users/user
 * @validte nothing
 */
router.get("/", (req, res) => {
  db.query("SELECT * FROM users.fn_user_selectall()", 
    (err, result) =>err ? res.send(err) : res.send(result.rows));
});

/**-----------------------------------
 * @descrip Get one in a user Table
 * @route /users/user/?id
 * @method get
 * @schemaTable users/user
 * @validte nothing
 * -----------------------------------
 */
router.get("/:id", (req, res) => {
  const { user_id } = req.params;
  db.query("SELECT * FROM users.fn_user_selectone($1)", 
    [user_id], (err, result) =>
    err ? res.send(err) : res.send(result.rows));
});

/**-----------------------------------
 * @descrip Create new one in a user Table
 * @route users/user
 * @method post
 * @schemaTable users/user
 * @validte [num_employ,full_name,username,passwd]
 * -----------------------------------
 */
router.post("/", (req, res, next) => {
  const error = validateUser(req.body);
  if (error) return res.status(400).json({ msage: error.details[0].message });
  const { username } = req.body;
  db.query("SELECT * FROM users.fn_user_selectname($1)", 
    [username], (err, result) =>
    result.rows.length ? res.json({ message: "This code is already exists" }) : next());
});
router.post("/", (req, res) => {
  const { num_employ,full_name,username,passwd } = req.body;
  db.query("SELECT * FROM users.fn_user_insert($1,$2,$3,$4)", 
    [num_employ,full_name,username,passwd],
    (err, result) => err ? res.send(err) : res.send(result.rows));
});

/**-----------------------------------
 * @descrip update one in a user Table
 * @route /users/user/?id
 * @method put
 * @schemaTable users/user
 * @validte [user_id,num_employ,full_name,username,passwd]
 * -----------------------------------
 */
// router.put("/:id", (req, res, next) => {
//   const error = validateUser(req.body);
//   if (error) return res.status(400).json({ msage: error.details[0].message });
//   const { cod } = req.body;
//   db.query("SELECT * FROM items.fn_genral_selectcode($1)", [cod], (err, result) =>
//     result.rows.length ? res.json({ message: "This code is already exists" }) : next());
// });
router.put("/:id", (req, res) => {
  const error = validateUser(req.body);
  if (error) return res.status(400).json({ msage: error.details[0].message });
  const { num_employ,full_name,username,passwd } = req.body;
  const {user_id } = req.params;
  db.query("SELECT * FROM users.fn_user_update($1,$2,$3,$4,$5)", 
    [user_id,num_employ,full_name,username,passwd],
    (err, result) => err ? res.send(err) : res.send(result.rows));
});

/**-----------------------------------
 * @descrip update active in a user Table
 * @route /users/user/active/?id
 * @method put
 * @schemaTable users/user
 * @validte [user_id,active]
 * -----------------------------------
 */
router.put("active/:id", (req, res) => {
  const error = validateUser(req.body);
  if (error) return res.status(400).json({ msage: error.details[0].message });
  const { active } = req.body;
  const {user_id } = req.params;
  db.query("SELECT * FROM users.fn_user_update_active($1,$2)", 
    [user_id,active],
    (err, result) => err ? res.send(err) : res.send(result.rows));
});

/**-----------------------------------
 * @descrip update passe word in a user Table
 * @route /users/user/passwd/?id
 * @method put
 * @schemaTable users/user
 * @validte [user_id,passwd]
 * -----------------------------------
 */
router.put("passwd/:id", (req, res) => {
  const error = validateUser(req.body);
  if (error) return res.status(400).json({ msage: error.details[0].message });
  const { passwd } = req.body;
  const {user_id } = req.params;
  db.query("SELECT * FROM users.fn_user_update_passwd($1,$2)", 
    [user_id,passwd],
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
  const { user_id } = req.params;
  db.query("SELECT * FROM users.fn_user_delete($1)", [user_id],
    (err, result) => err ? res.send(err) : res.send(result.rows));
});

module.exports = router;
