const router = require('express').Router();


router.post('/register', (req, res) => {
  res.send("Register Router working.");
})


module.exports = router;