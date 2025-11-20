const express = require("express");
const joi = require("joi");

const db = require("../../connectToDB");
const router = express().router;

/**
 * @description Validete to user enter
 * @param {id,num_employ,id_user,user_name,passwd,active} == > req.body
 * @returns error validate
 * 
 */
const schema = function (obj) {
  const sch = joi.object({
    id: joi.number(),
    num_employ: joi.number().required(),
    id_user: joi.number().required(),
    user_name: joi.string().min(2),
    passwd: joi.string.min(3),
    active: joi.boolean()
  });
  const { error } = sch.validate(body);
  return error;
};

/**
 * @description Get all a user  table
 * @tables ta_user
 * @schema users
 * @method get
 * @url /users/user
 * @returns all a table user
 * 
 */
router.get("/", (req, res) => {
  db.query("SELECT * FROM users.Ta_user", (err, result) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      res.send(result.rows);
      console.log(result);
    }
  });
});

/**
 * @description Get one row in a user table
 * @tables ta_user
 * @schema users
 * @method get
 * @url /users/user/?id
 * @returns row in a table user
 * 
 */
router.get("/:id", (req, res) => {
  const { id } = req.body;
  db.query("SELECT * FROM users.Ta_user WHERE id=$1", [id], (err, result) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      res.send(result.rows);
      console.log(result);
    }
  });
});

/**
 * @description create new row in a user table
 * @tables ta_user
 * @schema users
 * @method post
 * @url /users/user
 * @returns nothing
 * 
 */
router.post("/", (req, res) => {
  const error = schema(req.body);
  if (error) {
    return res.status(400).json({ msage: error.details[0].message });
  }
  const { num_employ, id_user } = req.body;
  db.query(
    "CALL users.Pr_user_Insert($1,$2)",
    [num_employ, id_user],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

/**
 * @description modify  basic data in a user table
 * @tables ta_user
 * @schema users
 * @method put
 * @url /users/user/?id
 * @returns nothing
 * 
 */
router.put("/:id", (req, res) => {
  const error = schema(req.body);
  if (error) {
    return res.status(400).json({ msage: error.details[0].message });
  }
  const { id, num_employ, id_user,active } = req.body;
  db.query(
    "CALL users.Pr_user_update0($1,$2,$3,$4)",
    [id, num_employ, id_user,active],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

/**
 * @description modify  password & username in a user table
 * @tables ta_user
 * @schema users
 * @method put
 * @url /users/user/?id
 * @returns nothing
 * 
 */
router.put("/register/:id", (req, res) => {
  const error = schema(req.body);
  if (error) {
    return res.status(400).json({ msage: error.details[0].message });
  }
  const { id, username, password } = req.body;
  db.query(
    "CALL users.Pr_user_updatepass($1,$2,$3)",
    [id, username, password],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

/**
 * @description delete row in a user table
 * @tables ta_user
 * @schema users
 * @method delete
 * @url /users/user/?id
 * @returns nothing
 * 
 */
router.delete("/:id", (req, res) => {
  const { id } = req.body;
  db.query("CALL users.Pr_user_delete($1)", [id], (err, result) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

module.exports = router;
