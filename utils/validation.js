//Validation
const Joi = require('@hapi/joi'); // https://hapi.dev/family/joi/



const registerValidation = (userData) => {

  const userValidationSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  });

  const validUserRegistration = userValidationSchema.validate(userData);

  return validUserRegistration;

}



const loginValidation = userData => {

  const loginValidationSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  });

  const validUserLogin = loginValidationSchema.validate(userData)

  return validUserLogin;
}



module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;