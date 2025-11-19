const joi = require("joi");

/**
 * @table CREATE TABLE employees.Ta_employe
(
  id                SERIAL PRIMARY KEY,
  num               int,
  firstName         varchar(20) ,
  lastName          varchar(60),
  gender CHAR(1) CHECK (gender IN ('M', 'F')),
  brithDate         date,
  hireDate          date,
  department_id     int REFERENCES public.Ta_departments(id) ON DELETE SET NULL,
  jobTitle          varchar(50),
  phone             varchar(20),
  addres            text,
  stat              varchar(20) DEFAULT 'Active' CHECK (stat IN ('Active', 'Inactive', 'Terminated'))
);
* @procedures 
  - employees.fn_employe_delete(id_employe)
  - employees.fn_employe_selectall()
  - employees.fn_employe_selectone(id)
  - employees.fn_employe_selectFname(firstName)
  - employees.fn_employe_selectLname(firstName)
  - employees.fn_employe_selectnum(num)

*/

module.exports.validateEmploye = function (obj) {
  const sch = joi.object({
    // id: joi.number(),
    // cod: joi.string().max(2).min(1).required(),
    // nam: joi.string().min(3).max(20).required(),
    // id_user: joi.number().required(),
  });
  const { error } = sch.validate(obj);
  return error;
};
