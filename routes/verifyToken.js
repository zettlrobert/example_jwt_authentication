const jwt = require('jsonwebtoken');

// Middleware Function access Routes only with token.
// Token is assigned when user is loggingin

module.exports = function (req, res, next) {
  // Check token from request header
  const token = req.header('auth-token');

  // Denie Access if no token 
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);

    // add verified to user
    req.user = verified;

    // call next
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
}