const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

router.get('/', (req, res) => {
  res.render('registration');
});

router.post('/', async (req, res) => {
  const {
    name, email, password,
  } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const userNameToRegister = await User.findOne({ where: { name } });
  const emailToRegister = await User.findOne({ where: { email } });

  if (userNameToRegister === null && emailToRegister === null) {
    const createUser = await User.create({ name, email, password: hash });
    req.session.user = createUser.name;
    req.session.userId = createUser.id;
    return res.json(createUser);
  }
  res.json('Такой пользователь уже зарегестрирован');
});

module.exports = router;
