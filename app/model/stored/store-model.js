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
* @Function 
  - stored.fn_store_insert(text, text, integer)
  - stored.fn_store_update(integer,text, text, integer)
  - stored.fn_store_delete(integer)
  - stored.fn_store_selectall()
  - stored.fn_store_selectone(integer)
  - stored.fn_store_selectcod(text)
  - stored.fn_store_selectnam(text)
*/

module.exports.validateStore = function (obj) {
  const sch = joi.object({
    id: joi.number(),
    cod: joi.string().max(3).min(1).required(),
    nam: joi.string().min(3).max(20).required(),
    id_user: joi.number().required(),
  });
  const { error } = sch.validate(obj);
  return error;
};
