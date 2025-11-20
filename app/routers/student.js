
// '/edit/:id'
// '/read/:id'
const express = require("express");
const { db } = require("../connectToDB");
const router = express().router;


router.get("/students", (req, res) => {
  db.query("SELECT * FROM public.student_details",
    (err, result) =>
      err ? res.send(err) : res.json(result.rows));
});


router.post("/add_user", (req, res) => {
  const { id, name, email, age  , gender } = req.body;
  db.query(
    `INSERT INTO public.student_details(id, name, email, age, gender)
	    VALUES ($1,$2,$3,$4,$5);`,
    [id, name, email, age, gender],
    (err, result) => err ? res.send(err) : res.send(result.rows));
});


router.get("/get_student/:id", (req, res) => {
  
  const id= req.params.id
  db.query("SELECT * FROM public.student_details WHERE id = ($1)",
     [id],
      (err, result) =>
      err ? res.send(err) : res.json(result.rows));
});

router.put("/edit_student/:id", (req, res) => {
  const { name, email, age  , gender } = req.body;
  const id= req.params.id
  db.query("update public.student_details set name=($1),email=($2),age=($3),gender=($4)  WHERE id = ($5)",
       [ name, email, age, gender,id],
      (err, result) =>
      err ? res.send(err) : res.json(result.rows));
});

router.delete("/delete/:id", (req, res) => {
  // const { name, email, age  , gender } = req.body;
  const id= req.params.id
  db.query("delete from public.student_details  WHERE id = ($1)",
       [ id],
      (err, result) =>
      err ? res.send(err) : res.json(result.rows));
});

module.exports = router;
