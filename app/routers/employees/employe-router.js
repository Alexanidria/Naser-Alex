const router = require("express").Router();

const { db } = require("../../connectToDB");
const { validateEmploye } = require("../../model/employees/employe-model");

/**-----------------------------------
 * @descrip Get all in a employe Table
 * @route /employees/employe
 * @method get
 * @schemaTable employees/employe
 * @validte nothing
 * -----------------------------------
 */
router.get("/", (req, res) => {
  db.query("select * from employees.fn_employe_selectall();", 
    (err, result) => {err ? res.send(err) : res.send(result.rows);
  });
});

module.exports = router;
