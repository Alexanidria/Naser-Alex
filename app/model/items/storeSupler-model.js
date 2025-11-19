const joi = require("joi");

/**
 * @table CREATE TABLE items.Ta_storeSupler
(
  id       smallint    NOT NULL,
  cod     varchar(4)  NOT NULL UNIQUE,
  nam      varchar(30) NOT NULL,
  codStore varchar(3)  NOT NULL,
  id_user  smallint    NOT NULL,
  PRIMARY KEY (id)
);
* @function 
  - items.fn_storeSupler_insert(text, text,text, integer)
  - items.fn_storeSupler_update(integer,text, text,text, integer)
  - items.fn_storeSupler_delete(integer)
  - items.fn_storeSupler_selectall()
  - items.fn_storeSupler_selectone(integer)
  - items.fn_storeSupler_selectcode(text)
*/
module.exports.validateStoreSupler = function (obj) {
  const sch = joi.object({
    id: joi.number(),
    cod: joi.string().max(4).min(1).required(),
    name: joi.string().min(3).max(30).required(),
    codStore: joi.string().min(1).max(3).required(),
    id_user: joi.number().required(),
  });
  const { error } = sch.validate(obj);
  return error;
};
