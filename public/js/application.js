const $formRegister = document.querySelector('[data-createForm="create-form"]');
const $titleRegistr = document.querySelector('[data-registr="registr"]');

$formRegister?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const $userNameValue = $formRegister.querySelector('[data-user="user-name"]').value;
  const $emailValue = $formRegister.querySelector('[data-email="email"]').value;

  const $passwordValue = $formRegister.querySelector('[data-password="password"]').value;

  const $passwordValue2 = $formRegister.querySelector('[data-password="password-two"]').value;

  if ($passwordValue !== $passwordValue2) {
    alert('Пароли не совпадают');
  } else {
    const options = {
      method: 'POST',
      body: JSON.stringify({ name: $userNameValue, email: $emailValue, password: $passwordValue }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch('/users/registrations', options);

    const data = await response.json();
    if (data === 'Такой пользователь уже зарегестрирован') {
      const $divError = document.createElement('div');
      $divError.setAttribute('class', 'div-error-user');
      $divError.innerText = 'Такой пользователь уже зарегестрирован';
      $titleRegistr.after($divError);
    } else {
      window.location.replace(`/users/${data.id}`);
    }
  }
});

const $formIndexSearch = document.querySelector('[data-index-form="index"]');

$formIndexSearch?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const $inputValueWeight = $formIndexSearch.querySelector('[data-weight="weight"]').value;

  const $inputValueAge = $formIndexSearch.querySelector('[data-age="age"]').value;

  const $inputValueHip = $formIndexSearch.querySelector('[data-hip="hip"]').value;

  const $inputValueHeight = $formIndexSearch.querySelector('[data-height="height"]').value;

  const $inputValueSex = $formIndexSearch.querySelector('[data-sex="sex"]').value;

  const $inputValueWaist = $formIndexSearch.querySelector('[data-waist="waist"]').value;

  const idUser = document.querySelector('[data-cabinet="person-cabinet"]').id;

  function check() {
    let data;
    if ($inputValueWeight !== '' && $inputValueAge !== '' && $inputValueHeight !== '' && $inputValueSex !== '') {
      data = {
        weight: {
          value: `${$inputValueWeight}`,
          unit: 'kg',
        },
        height: {
          value: `${$inputValueHeight}`,
          unit: 'cm',
        },
        sex: `${$inputValueSex}`,
        age: `${$inputValueAge}`,
      };
    }

    if ($inputValueHip !== '') { data.hip = `${$inputValueHip}`; }

    if ($inputValueWaist !== '') { data.waist = `${$inputValueWaist}`; }

    return data;
  }

  const optionBmi = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-rapidapi-host': 'bmi.p.rapidapi.com',
      'x-rapidapi-key': process.env.API_KEY_CALCULATOR,
    },
    body: JSON.stringify(check()),
  };

  const resBmi = await fetch('https://bmi.p.rapidapi.com', optionBmi);

  const resultBmi = await resBmi.json();

  function sumResult() {
    let resultObj;
    if (!resultBmi.bmi.risk) {
      resultObj = {
        sstatus: resultBmi.bmi.status,
        ideal: resultBmi.ideal_weight,
      };
    }
    if (resultBmi.bmi.risk) {
      resultObj = {
        sstatus: resultBmi.bmi.status,
        risk_status: resultBmi.bmi.risk,
        ideal_weight: resultBmi.ideal_weight,
      };
    }

    if (resultBmi.whtr) { resultObj.whtr_status = resultBmi.whtr.status; }
    if (resultBmi.whr) { resultObj.whr_status = resultBmi.whr.status; }
    return resultObj;
  }

  const resultTranslate = sumResult();

  const arr = [];
  for (const i in resultTranslate) { arr.push(`${i} - ${resultTranslate[i]}:`); }

  const resStr = arr.join(', ');

  const option = {
    method: 'POST',
    body: JSON.stringify({
      str: resStr, bmi: resultBmi, sex: $inputValueSex, age: $inputValueAge, id: idUser,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const result = await fetch(`/users/${idUser}`, option);

  const dataResult = await result.json();

  const $personData = document.createElement('div');
  $personData.setAttribute('class', 'person-result-body');
  $personData.innerHTML = `
  <div class="result-raw-data"> <span class="title-data">Исходные данные:</span> вес: ${dataResult.original_weight}, рост: ${dataResult.original_height}, возраст: ${dataResult.age}, пол: ${dataResult.sex}</div>

  <div class="result-raw-data"> <span class="title-data">Статус:</span> ${dataResult.status}</div>

  <div class="result-raw-data"> <span class="title-data">Риск:</span> ${dataResult.risk}</div>
  
  <div class="result-raw-data"> <span class="title-data">BMR, Базальная скорость обмена веществ, calories:</span> ${dataResult.bmr}</div>
  
  <div class="result-raw-data"> <span class="title-data">Рекомендованный вес:</span> ${dataResult.ideal_weight}</div>

  <div class="result-raw-data"> <span class="title-data">Дата:</span> ${dataResult.createdAt}</div>
  <hr>
  `;

  const $personTitle = document.querySelector('[class="person-result-title"]');
  $personTitle.after($personData);
});
