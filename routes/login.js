const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

router.get('/', async (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    const checkResult = await bcrypt.compare(req.body.password, user.password);

    if (checkResult) {
      req.session.user = user.name;
      req.session.userId = user.id;
      res.redirect(`/users/${user.id}`);
    } else if (!checkResult) {
      res.render('login', { error: 'Неправильный пароль' });
    }
  } catch (e) {
    res.render('login', { error: `error ${e}` });
  }
});

module.exports = router;
