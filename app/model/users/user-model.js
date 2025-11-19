const joi = require('joi')

/**
 * @table CREATE TABLE users.Ta_user (
  id_user       SERIAL PRIMARY KEY,
  num_employ    int NOT NULL,
  full_name     VARCHAR(100),
  dat           TIMESTAMP DEFAULT NOW(),
  username      varchar(20) UNIQUE NOT NULL,
  passwd        varchar(255) NOT NULL,
  active        BOOLEAN NOT NULL DEFAULT TRUE
);
* @function 
  - users.fn_user_insert(num_employ,username,passwd)
  - users.fn_user_update(user_id,num_employ,username,passwd)
  - users.fn_user_update_active(user_id,active)
  - users.fn_user_delete(user_id)
  - users.fn_user_selectall()
  - users.fn_user_selectone(user_id)
  - users.fn_user_selectname(username)
*/


/**
 * @description Validete to user enter
 * @param {user_id,num_employ,full_name,username} == > req.body 
 * @returns error validate
 */

module.exports.validateUser = function (obj) {
  const sch = joi.object({
    user_id: joi.number(),
    num_employ: joi.number(),
    full_name: joi.string().min(3).max(100).required(),
    username: joi.string().required().min(2).max(20),
  });
  const { error } = sch.validate(obj);
  return error;
};
