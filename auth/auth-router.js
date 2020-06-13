const router = require('express').Router();
const db = require('../database/bdModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secrets = require('./config');


router.post('/register', async (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hash;
  await db.addUser(req.body)
  try {
    res.status(201).send(req.body)
  } catch {
    res.status(500).json({message:'There is a server error'})
  }
});

router.post('/login', async(req, res) => {
  const { password, username } = req.body;
  try {
    const user = await db.findUserByName(username)

    if (user && bcrypt.compareSync(password, user.password)) {

      const token = generateToken(user)

      res.status(200).json({message: ` Welcome ${user.username}`, token})
    } else {
      res.status(404).json({message: `${username}, could not be found`})
    }
  } catch  {
    res.status(500).json({ message: 'There is a server error' })
  }
  
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }
  const config = {
    expiresIn: "1hr"
  }
  return jwt.sign(payload, secrets.jwtSecret, config)
}

module.exports = router;
