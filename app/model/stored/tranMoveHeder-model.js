const joi = require("joi");

/**
 * @table CREATE TABLE stored.Ta_TranMovHeder
(
  id            uuid        DEFAULT gen_random_uuid(),
  numDocom     int         NOT NULL,
  cod_store      varchar(3)  NOT NULL,
  dat           date        NOT NULL ,
  cod_kinDoc    varchar(2)  NOT NULL,
  datNow       date        DEFAULT now() ,  
  id_user       smallint    ,
  account_finnn int         ,
  join_         char(2)     ,
  numJoin       int         ,
  jop           int         DEFAULT 0 ,
  post          smallint    ,
  PRIMARY KEY (id)   
);
* @Function 
  - stored.fn_TranMovHeder_insert(num_docom_ int,cod_store_ varchar(3), dat_ date, cod_kindoc_ varchar(2), id_user_ int, account_finnn_ int, jop_ int)
  - stored.fn_TranMovHeder_update(id_ uuid, num_docom_ int, cod_store_ varchar(3), dat_ date, cod_kindoc_ varchar(2), id_user_ int, account_finnn_ int, jop_ int)
  - stored.fn_TranMovHeder_delete(id_ uuid)
  - stored.fn_TranMovHeder_selectall()
  - stored.fn_TranMovHeder_selectone(id_ uuid)
  - stored.fn_TranMovHeder_selectforone(num_docom_ int,cod_store_ varchar(3), cod_kindoc_ varchar(2))
*/

module.exports.validateTranMoveHeder = function (obj) {
  const sch = joi.object({
    id_heder: Joi.string().guid().required(),
    id_item: Joi.string().guid().required(),
    cont: joi.number().required(),
    prise: joi.number(),
  });
  const { error } = sch.validate(obj);
  return error;
};
