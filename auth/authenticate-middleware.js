/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');
const secrets = require('./config');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.token
    //receive token from browswer
    if (token) {
      jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if (err) {
           return res.status(401).json({message: 'You are not authorized to enter'})
        } else {
          req.decodedToken = decodedToken;
          console.log(decodedToken) 
            next()
        }
      })
    }
  } catch {
    return res.status(401).json({ you: 'shall not pass!' });
  }
};
