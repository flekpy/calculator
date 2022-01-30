const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('index', { youLogged: req.session.user });
});

module.exports = router;
