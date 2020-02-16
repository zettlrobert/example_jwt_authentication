const router = require('express').Router();
const User = require('../model/User');
const {
  registerValidation,
  loginValidation } = require('../utils/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();



router.post('/register', async (req, res) => {

  // validate data before user is created
  // const { error } = await userValidationSchema.validate(req.body)

  const { error } = registerValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message)

  // Check if user is already registered
  const emailExists = await User.findOne({ email: req.body.email })


  // Hash the Password
  // 1. create salt
  const salt = await bcrypt.genSalt(10);
  // 2. hash password
  const hashPassword = await bcrypt.hash(req.body.password, salt);




  if (emailExists) return res.status(400).send("User already Exists");

  // Create new User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  })

  try {
    const savedUser = await user.save();
    res.send("User Succesfully Created");
  } catch (err) {
    res.status(400).send(`There was an error: ${err}`);
  }
});




//Login
router.post('/login', async (req, res) => {

  const { error } = loginValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message)


  // Check if user is registered
  const user = await User.findOne({ email: req.body.email })

  // Return Error if user is not registered
  if (!user) return res.status(400).send('User not Registerd');

  // Check if Password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) return res.status(400).send('Invalid Password');


  // Generate and assign token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
})


module.exports = router;