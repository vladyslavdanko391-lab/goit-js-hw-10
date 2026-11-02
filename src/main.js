// Тут пиши JavaScript свого домашнього завдання.
// Додаткові модулі створюй поруч у src/ і імпортуй їх сюди:
//   import { something } from './something.js';
import { PREP_TIME } from './js/menu.js';

const refs ={
    form: document.querySelector('.form'),
    orderLog: document.querySelector('.order-log'),
}

function makeOrder(delay, shouldResolve) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
}

function addOrderRow(drinkName) {
    const li = document.createElement('li');

    li.classList.add('row-pending');
    li.textContent = `⏳ ${drinkName} · у роботі…`;

    refs.orderLog.appendChild(li);

    return li;
}

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const drinkName = formData.get('drink');
    const state = formData.get('state');

    const delay = PREP_TIME[drinkName];
    const shouldResolve = state === 'fulfilled';

    const row = addOrderRow(drinkName);

    makeOrder(delay, shouldResolve)
      .then(delay => {
        row.className = 'row-ok';
        row.textContent = `✅ ${drinkName} · готово! · ${delay}ms`;
    })

    .catch(delay => {
        row.className = 'row-err';
        row.textContent = `❌ ${drinkName} · скасовано! · ${delay}ms`;
    })

    .finally(() => {
        const time = new Date().toLocaleTimeString('uk-UA');
        row.textContent += ` · ${time}`;
    })
}
