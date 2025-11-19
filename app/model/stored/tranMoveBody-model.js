const joi = require("joi");

/**
 * @table CREATE TABLE stored.Ta_TranMovBody
(
  id            uuid  DEFAULT gen_random_uuid(),
  id_heder      uuid  NOT NULL,  
  id_item       uuid        ,  
  cont          int   DEFAULT 0,
  prise         int   DEFAULT 0,
  total         int   GENERATED ALWAYS AS (cont * prise) STORED,
  nots          varchar(250),
  averg         decimal(15,5),
  totalAvg      decimal(15,5),
  datNow       date   DEFAULT now(),
  PRIMARY KEY (id)
);
* @Function 
  - Stored.fn_TranMovBody_Insert(id_heder_ uuid, id_item_ uuid, cont_ int, prise_ int, nots_ varchar(250))
  - Stored.fn_TranMovBody_update(id_ uuid,id_heder_ uuid, id_item_ uuid, cont_ int, prise_ int, nots_ varchar(250))
  - Stored.fn_TranMovBody_delete(id_ uuid)
  - Stored.fn_TranMovBody_selectall()
  - Stored.fn_TranMovBody_selectone(id_ uuid)
  - Stored.fn_TranMovBody_selectHeder(id_heder_ uuid)  
*/

module.exports.validateTranMoveBody = function (obj) {
  const sch = joi.object({
    id_heder: Joi.string().guid().required(),
    id_item: Joi.string().guid().required(),
    cont: joi.number().required(),
    prise: joi.number(),
  });
  const { error } = sch.validate(obj);
  return error;
};
