import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[name="delay"]');
const ratioFulfilled = document.querySelector('input[value="fulfilled"]');
const ratioRejected = document.querySelector('input[value="rejected"]');
const notifyBtn = document.querySelector('button');

let delayValue = 0;
inputDelay.addEventListener('input', event => {
  delayValue = Number(event.target.value);
  console.log(delayValue);
});

function CreateNotyfication(delay) {
  const Options = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (ratioFulfilled.checked) {
        resolve(delay);
      } else if (ratioRejected.checked) {
        reject(delay);
      } else {
        reject('none');
      }
    }, delay);
  });
  return Options;
}

form.addEventListener('submit', event => {
  event.preventDefault();
  CreateNotyfication(delayValue)
    .then(delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
});
