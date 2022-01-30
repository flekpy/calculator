const qs = require('qs');
const fetch = require('node-fetch');
const router = require('express').Router();

const { Index } = require('../db/models');

function isLogged(req, res, next) {
  if (req.session.user) return next();
  return res.render('access');
}

router.get('/', isLogged, async (req, res) => {
  const index = await Index.findAll({
    where: { user_id: req.session.userId }, order: [['id', 'DESC']], raw: true,
  });
  res.render('users', { id: req.session.userId, youLogged: req.session.user, index });
});

router.post('/', async (req, res) => {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'x-rapidapi-host': 'google-translate20.p.rapidapi.com',
      'x-rapidapi-key': process.env.API_KEY_TRANSLATE,
    },
    body: qs.stringify({
      text: req.body.str,
      tl: 'ru',
      sl: 'en',
    }),
  };

  const response = await fetch('https://google-translate20.p.rapidapi.com/translate', options);

  const data = await response.json();

  let statusValue;
  let riskValue;
  let idealWeight;
  let whtrStatus;
  let whrStatus;

  const resultStr = data.data.translation;

  const parseArr = resultStr.split(':');

  parseArr.forEach((el) => {
    if (el.includes('sstatus')) {
      statusValue = el.slice(9);
    }
    if (el.includes('risk_status')) {
      riskValue = el.slice(15);
    }
    if (el.includes('ideal_weight')) {
      idealWeight = el.slice(17);
    }
    if (el.includes('whtr_status')) {
      whtrStatus = el.slice(16);
    }
    if (el.includes('whr_status')) {
      whrStatus = el.slice(15);
    }
  });

  const createEntryIndex = await Index.create({
    status: statusValue,
    risk: riskValue,
    bmr: Math.floor(Number(req.body.bmi.bmr.value)),
    ideal_weight: idealWeight,
    whr_status: whrStatus,
    whr_value: Math.floor(Number(req.body.bmi.whr.value)),
    whtr_status: whtrStatus,
    whtr_value: Math.floor(Number(req.body.bmi.whtr.value)),
    original_height: Math.floor(Number(req.body.bmi.height.cm)),
    original_weight: Math.floor(Number(req.body.bmi.weight.kg)),
    sex: req.body.sex,
    age: Math.floor(Number(req.body.age)),
    user_id: Number(req.body.id),
  });

  res.json(createEntryIndex);
});

module.exports = router;
