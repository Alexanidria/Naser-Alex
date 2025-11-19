const joi=require('joi')
/**
 * @table CREATE TABLE items.Ta_Cars
(
  id      smallserial NOT NULL,
  name    varchar(20) NOT NULL,
  dat     date        NULL DEFAULT now(),
  id_user smallint   ,
  PRIMARY KEY (id)
);
* @procedures 
  - Items.Pr_cars_Insert( IN nam text, IN id_user smallint)
  - Items.Pr_cars_getAll( )
  - Items.Pr_cars_getOne(IN id int )
  - Items.Pr_cars_Update( IN id int,IN nam text, IN id_user smallint)
  - Items.Pr_cars_Delete(IN id int) 
*/

/**
 * @description Validete to user enter
 * @param {id,nam,id_user} == > req.body 
 * @returns error validate
 */
module.exports.validateCar = function (obj) {
  const sch = joi.object({
    id: joi.number(),
    nam: joi.string().min(3).max(20).required(),
    id_user: joi.number().required(),
  });
  const { error } = sch.validate(obj);
  return error;
};
