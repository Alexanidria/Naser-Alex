const joi = require("joi"); 

/**
 * @table CREATE TABLE items.Ta_basicUnit
(
  id      smallserial NOT NULL,
  cod     varchar(2)  NOT NULL,
  nam     varchar(20) NOT NULL,
  id_user smallint    NOT NULL,
  PRIMARY KEY (cod)
);
* @procedures 
  - Items.Pr_basicUnit_Insert(IN cod_ text, IN nam_ text, IN id_user_ int)
  - Items.Pr_basicunit_getAll( )
  - Items.Pr_basicunit_getOne(IN id_ int )
  - Items.Pr_basicUnit_Update(IN id_ int,IN cod_ text, IN nam_ text, IN id_user_ int)
  - Items.Pr_basicUnit_Delete(IN id_ int)
*/

module.exports.validateUnit = function (obj) {
  const sch = joi.object({
    id: joi.number(),
    cod: joi.string().max(2).min(1).required(),
    name: joi.string().min(3).max(20).required(),
    id_user: joi.number().required(),
  });
  const { error } = sch.validate(obj);
  return error;
};
