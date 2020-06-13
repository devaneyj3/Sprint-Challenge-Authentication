const router = require('express').Router();
const db = require('../database/bdModel');
const bcrypt = require('bcrypt');


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

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
