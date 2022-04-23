const express = require('express');
const router = express.Router();
const User = require('../models/user')
const { sign } = require('jsonwebtoken');



const secret = process.env.JWT_TOKEN
router.post('/register', async function (req, res, next) {
  console.log('resgiter')
  const { name, email, password } = req.body
  const user = new User({ name, email, password })

  try {
    await user.save()
    return res.status(200).json(user)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ erro: 'Register User' })
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body


  try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: 'Incorrect email or password' })
    }

    user.isCorrectPassword(password, function (err, success) {
      if (!success) {
        return res.status(401).json({ error: 'Incorrect email or password' })
      }

      const token = sign({ email }, secret, { expiresIn: '1d' })
      return res.json({
        user,
        token
      })
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal erro, please try again" })
  }
})

module.exports = router;
