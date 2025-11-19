const joi = require("joi");

/**
 * @table CREATE TABLE items.Ta_ITem
(
  id               uuid        DEFAULT gen_random_uuid(),
  num              varchar(20) NOT NULL UNIQUE,
  code_storeSupler varchar(4)  NOT NULL,
  nam              varchar(50) NOT NULL,
  rereqost         smallint   ,
  id_user          smallint    NOT NULL,
  id_genral        smallint    NOT NULL,
  id_unit          smallint    NOT NULL,
  dateAdd          date        NOT NULL,
  dateModif        date       ,
  id_car           smallint    NOT NULL,
  PRIMARY KEY (id)
);
* @function
  - items.fn_item_insert(character varying, character varying, character varying, smallint, smallint, smallint, smallint, date, smallint)
  - items.fn_item_update(uuid, character varying, character varying, character varying, smallint, smallint, smallint, smallint, date, smallint)
  - items.fn_item_delete(uuid)
  - items.fn_item_selectall()
  - items.fn_item_selectone(uuid)
  - items.fn_item_selectnumber(text)
*/

module.exports.valdeteInsertItem = function (obj) {
  const sch = joi.object({
     id: joi.string(),
    num: joi.string().trim().max(20).min(1).required(),
    code_storeSupler: joi.string().trim().max(4).required(),
    name: joi.string().trim().min(3).max(20).required(),
    rereqost: joi.number().default(0),
    id_user: joi.number().required(),
    id_genral: joi.number(),
    id_unit: joi.number().required(),
    dateadd: joi.date(),
    id_car: joi.number().required(),
  });
  const { error } = sch.validate(obj);
  return error;
};

module.exports.valdeteUpdateItem = function (obj) {
  const sch = joi.object({
    id: joi.string(),
    num: joi.string().trim().max(20).min(1).required(),
    code_storeSupler: joi.string().trim().max(4).required(),
    name: joi.string().trim().min(3).max(20).required(),
    rereqost: joi.number().default(0),
    id_user: joi.number().required(),
    id_genral: joi.number(),
    id_unit: joi.number().required(),
    datemodif: joi.date(),
    id_car: joi.number().required(),
  });
  const { error } = sch.validate(obj);
  return error;
};

