const joi = require("joi");

/**
 * @table CREATE TABLE items.Ta_basicGenral
(
  id      smallserial NOT NULL,
  cod     varchar(2)  NOT NULL UNIQUE,
  nam     varchar(20) NOT NULL,
  id_user smallint    NOT NULL,
  PRIMARY KEY (id)
);
* @procedures 
  - items.Pr_basicGenral_Insert(IN cod_ text, IN nam_ text, IN id_user_ int)
  - Items.Pr_basicGenral_getAll( )
  - Items.Pr_basicGenral_getOne(IN id_ int )
  - Items.Pr_basicGenral_Update(IN id_ int,IN cod_ text, IN nam_ text, IN id_user_ int)
  - Items.Pr_basicGenral_Delete(IN id_ int)
*/

module.exports.validateGenral = function (obj) {
  const sch = joi.object({
    id: joi.number(),
    cod: joi.string().max(2).min(1).required(),
    nam: joi.string().min(3).max(20).required(),
    id_user: joi.number().required(),
  });
  const { error } = sch.validate(obj);
  return error;
};
