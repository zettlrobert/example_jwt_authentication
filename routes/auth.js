const router = require('express').Router();
const User = require('../model/User');
const {
  registerValidation,
  loginValidation } = require('../utils/validation');






router.post('/register', async (req, res) => {

  // validate data before user is created
  // const { error } = await userValidationSchema.validate(req.body)

  const { error } = registerValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message)

  // Check if user is already registered
  const emailExists = await User.findOne({ email: req.body.email })

  if (emailExists) return res.status(400).send("User already Exists");

  // Create new User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(`There was an error: ${err}`);
  }
});


module.exports = router;